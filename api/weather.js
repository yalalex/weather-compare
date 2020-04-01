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
  const time = Date.now();
  const lastUpdate = await Current.find()
    .sort({ _id: -1 })
    .limit(1);
  if (time - lastUpdate[0].time < 270000) return;
  cities.map(async city => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&units=metric&APPID=${openWeatherMapKey}`
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
        sunset
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

exports.getDaily = async function() {
  const time = new Date();
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const places = cities.slice(minutes, minutes + 5);
  const date = Date.now();
  places.map(async city => {
    try {
      const res = await axios.get(
        `https://api.weatherbit.io/v2.0/forecast/daily?lat=${city.lat}&lon=${city.lon}&units=M&key=${weatherBitKey}`
      );
      const forecast7days = res.data.data.slice(0, 7);
      const forecast = [];
      forecast7days.map(day => {
        if (day.temp.toFixed() === '-0') day.temp = 0;
        if (day.max_temp.toFixed() === '-0') day.max_temp = 0;
        if (day.min_temp.toFixed() === '-0') day.min_temp = 0;
        return forecast.push({
          icon: day.weather.icon,
          temp: day.temp,
          max: day.max_temp,
          min: day.min_temp
        });
      });
      const temp = forecast[0].temp.toFixed(),
        max = forecast[0].max.toFixed(),
        min = forecast[0].min.toFixed();
      if (hours === 8)
        await Archive.findOneAndUpdate(
          { name: city.name },
          {
            $push: {
              data: {
                temp,
                max,
                min,
                date
              }
            }
          }
        );
      const daily = {
        name: city.name,
        data: forecast,
        date
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

// exports.setBase = async function() {
//   cities.map(async city => {
//     const newArchive = new Archive({
//       name: city.name,
//       data: []
//     });
//     await newArchive.save();
//     const newDaily = new Daily({
//       name: city.name,
//       data: [],
//       date: Date.now()
//     });
//     await newDaily.save();
//     const newCurrent = new Current({
//       name: city.name,
//       time: Date.now(),
//       timezone,
//       icon: '0',
//       temp: 0,
//       humidity: 0,
//       wind: {},
//       sunrise: 0,
//       sunset: 0
//     });
//     await newCurrent.save();
//   });
// };
