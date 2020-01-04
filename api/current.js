const Current = require('../models/Current');
const schedule = require('node-schedule');
const axios = require('axios');
const openWeatherMapKey = config.get('openWeatherMapKey');
const cities = require('./lists/cities');

const getCurrent = schedule.scheduleJob('0 17 ? * 0,4-6', async function() {
  cities.map(async city => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&units=metric&APPID=${openWeatherMapKey}`
      );
      const { timezone, dt, main, wind, weather } = res.data,
        { temp, pressure, humidity } = main;
      const offset = new Date().getTimezoneOffset() * 60 + timezone;
      const current = {
        name: city.name,
        dt,
        temp,
        wind: wind.speed,
        pressure,
        humidity,
        weather: weather[0].main,
        sky: weather[0].description,
        icon: weather[0].icon,
        offset
      };
      if (current.temp.toFixed() === '-0') current.temp = 0;
      await Current.findOneAndUpdate(
        { name: current.name },
        { $set: current },
        { new: true }
      );
    } catch (error) {
      console.log(error);
    }
  });
});

module.exports = getCurrent;
