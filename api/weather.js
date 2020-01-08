const axios = require('axios');
const list = require('./cities');
const config = require('config');

const Current = require('../models/Current');
const Daily = require('../models/Daily');
const Archive = require('../models/Archive');

const openWeatherMapKey = config.get('openWeatherMapKey');
const weatherBitKey = config.get('weatherBitKey');

const cities = list.cities;

exports.getCurrent = async function() {
  cities.map(async city => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&units=metric&APPID=${openWeatherMapKey}`
      );
      const { main, wind, weather } = res.data,
        { temp, humidity } = main;
      const current = {
        name: city.name,
        time: Date.now(),
        icon: weather[0].icon,
        temp,
        humidity,
        wind
      };
      if (current.temp.toFixed() === '-0') current.temp = 0;
      await Current.findOneAndUpdate(
        { name: current.name },
        { $set: current },
        { new: true }
      );
      // const newCurrent = new Current({
      //   name: city.name,
      //   time: Date.now(),
      //   icon: weather[0].icon,
      //   temp,
      //   humidity,
      //   wind
      // });
      // if (newCurrent.temp.toFixed() === '-0') newCurrent.temp = 0;
      // await newCurrent.save();
    } catch (error) {
      console.error(error.message);
    }
  });
};

exports.getDaily = async function() {
  cities.map(async city => {
    try {
      const res = await axios.get(
        `https://api.weatherbit.io/v2.0/forecast/daily?lat=${city.lat}&lon=${city.lon}&units=M&key=${weatherBitKey}`
      );
      const forecast7days = res.data.data.slice(0, 7);
      const forecast = [];
      forecast7days.map(day => {
        if (day.max_temp.toFixed() === '-0') day.max_temp = 0;
        if (day.min_temp.toFixed() === '-0') day.min_temp = 0;
        return forecast.push({
          icon: day.weather.icon,
          max: day.max_temp,
          min: day.min_temp
        });
      });
      await Archive.findOneAndUpdate(
        { name: city.name },
        {
          $push: {
            data: {
              max: forecast[0].max,
              min: forecast[0].min,
              date: Date.now()
            }
          }
        }
      );
      // const newArchive = new Archive(
      //   { name: city.name },
      //   { $push: { data: {
      //     max: forecast[0].max,
      //     min: forecast[0].min,
      //     date: Date.now
      //   }}}
      // );
      // await newArchive.save();
      const daily = {
        name: city.name,
        data: forecast
      };
      await Daily.findOneAndUpdate(
        { name: daily.name },
        { $set: daily },
        { new: true }
      );
      // const newDaily = new Daily({
      //   name: city.name,
      //   data: forecast
      // });
      // await newDaily.save();
    } catch (error) {
      console.error(error.message);
    }
  });
};
