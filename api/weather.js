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
      };
      if (current.temp.toFixed() === '-0') current.temp = 0;
      await Current.findOneAndUpdate(
        { name: current.name },
        { $set: current },
        { new: true }
      );
      // const newCurrent = new Current({
      //   name: city.name,
      //   time,
      //   icon: weather[0].icon,
      //   conditions: weather[0].main,
      //   temp,
      //   humidity,
      //   wind: wind.speed
      //   // pressure
      //   // sky: weather[0].description,
      //   // dt,
      //   // offset
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
      const forecast = forecast7days.map(day => {
        if (day.max_temp.toFixed() === '-0') day.max_temp = 0;
        if (day.min_temp.toFixed() === '-0') day.min_temp = 0;
        return day;
      });
      const newArchive = new Archive({
        name: city.name,
        max: forecast[0].max_temp,
        min: forecast[0].min_temp
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
