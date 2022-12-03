const axios = require('axios');
require('dotenv').config();

const Current = require('../models/Current');
const Daily = require('../models/Daily');
const Archive = require('../models/Archive');

const { cities } = require('./cities');

const OPENWEATHERMAP_API_KEY = process.env.OPENWEATHERMAP_API_KEY;
const WEATHERBIT_API_KEY = process.env.WEATHERBIT_API_KEY;

exports.getCurrent = async function () {
  console.log('Updating current weather...');
  const time = Date.now();
  const lastUpdate = await Current.find().sort({ _id: -1 }).limit(1);
  if (time - lastUpdate[0].time < 270000) return;
  cities.map(async (city) => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&units=metric&APPID=${OPENWEATHERMAP_API_KEY}`
      );
      const { main, wind, weather, timezone, sys } = res.data,
        { temp, humidity } = main,
        { sunrise, sunset } = sys;
      const current = {
        name: city.name,
        time,
        timezone,
        icon: weather[0].icon,
        temp,
        humidity,
        wind,
        sunrise,
        sunset,
      };
      if (current.temp.toFixed() === '-0') current.temp = 0;
      await Current.findOneAndUpdate(
        { name: current.name },
        { $set: current },
        { new: true }
      );
    } catch (error) {
      console.error(error.message);
    }
  });
};

exports.getDaily = async function () {
  console.log('Updating daily forecast...');
  const time = new Date();
  const minutes = time.getMinutes();
  const places = cities.slice(minutes, minutes + 5);
  const date = Date.now();
  const lastUpdate = await Archive.findOne({ name: places[0].name });
  places.map(async (city) => {
    try {
      const res = await axios.get(
        `https://api.weatherbit.io/v2.0/forecast/daily?lat=${city.lat}&lon=${city.lon}&units=M&key=${WEATHERBIT_API_KEY}`
      );
      const forecast7days = res.data.data.slice(0, 7);
      const forecast = [];
      forecast7days.map((day) => {
        if (day.temp.toFixed() === '-0') day.temp = 0;
        if (day.max_temp.toFixed() === '-0') day.max_temp = 0;
        if (day.min_temp.toFixed() === '-0') day.min_temp = 0;
        return forecast.push({
          icon: day.weather.icon,
          temp: day.temp,
          max: day.max_temp,
          min: day.min_temp,
        });
      });
      if (date - lastUpdate.data[lastUpdate.data.length - 1].date > 82800000) {
        const temp = forecast[0].temp.toFixed(),
          max = forecast[0].max.toFixed(),
          min = forecast[0].min.toFixed();
        await Archive.findOneAndUpdate(
          { name: city.name },
          {
            $push: {
              data: {
                temp,
                max,
                min,
                date,
              },
            },
          }
        );
      }

      const daily = {
        name: city.name,
        data: forecast,
        date,
      };
      await Daily.findOneAndUpdate(
        { name: city.name },
        { $set: daily },
        { new: true }
      );
    } catch (error) {
      console.error(error.message);
    }
  });
};
