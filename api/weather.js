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
      const { timezone, dt, main, wind, weather } = res.data,
        { temp, humidity } = main;
      const offset = new Date().getTimezoneOffset() * 60 + timezone;
      const time = offset + dt;
      const current = {
        name: city.name,
        time,
        icon: weather[0].icon,
        conditions: weather[0].main,
        temp,
        humidity,
        wind: wind.speed
        // pressure
        // sky: weather[0].description,
        // dt,
        // offset
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
  cities.map(async city => {
    try {
      const res = await axios.get(
        `https://api.weatherbit.io/v2.0/forecast/daily?lat=${city.lat}&lon=${city.lon}&units=M&key=${weatherBitKey}`
      );
      const forecast = res.data.data.map(day => {
        if (day.temp.toFixed() === '-0') day.temp = 0;
        if (day.max_temp.toFixed() === '-0') day.max_temp = 0;
        if (day.min_temp.toFixed() === '-0') day.min_temp = 0;
        return day;
      });
      const newArchive = new Archive({
        name: city.name,
        temp: forecast[0].temp
      });
      await newArchive.save();
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
};
