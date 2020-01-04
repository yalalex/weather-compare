const schedule = require('node-schedule');
const axios = require('axios');
const cities = require('./lists/cities');

const Current = require('../models/Current');
const Daily = require('../models/Daily');

const openWeatherMapKey = config.get('openWeatherMapKey');
const weatherBitKey = config.get('weatherBitKey');

exports.getCurrent = schedule.scheduleJob('*/5 * * * *', async function() {
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
      console.error(error.message);
    }
  });
});

exports.getDaily = schedule.scheduleJob('* 1 * * *', async function() {
  cities.map(async city => {
    try {
      const res = await axios.get(
        `https://api.weatherbit.io/v2.0/forecast/daily?lat=${city.lat}&lon=${city.lon}&units=M&key=${weatherBitKey}`
      );
      const forecast = res.data.data.map(day => {
        if (day.max_temp.toFixed() === '-0') day.max_temp = 0;
        if (day.min_temp.toFixed() === '-0') day.min_temp = 0;
        return day;
      });
      const daily = {
        name: city.name,
        data: forecast
      };
      await Daily.findOneAndUpdate(
        { name: daily.name },
        { $set: daily },
        { new: true }
      );
    } catch (error) {
      console.error(error.message);
    }
  });
});
