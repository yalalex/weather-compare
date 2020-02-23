const express = require('express');
const connectDB = require('./config/db');
const schedule = require('node-schedule');
const { getCurrent, getDaily } = require('./api/weather');

const Current = require('./models/Current');
const Daily = require('./models/Daily');
const Archive = require('./models/Archive');

const wakeUpDyno = require('./utils/wakeUpDyno');

const app = express();

connectDB();

getCurrent();

const dailyRule = new schedule.RecurrenceRule();
dailyRule.hour = 8;
dailyRule.minute = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
schedule.scheduleJob(dailyRule, function() {
  getDaily();
});

app.use(
  express.json({
    extended: false
  })
);

app.get('/api/current', async (req, res) => {
  try {
    const current = await Current.find();
    res.json(current);
  } catch (err) {
    console.error(err.message);
    res.status.send('Server Error');
  }
});

app.get('/api/daily', async (req, res) => {
  try {
    const daily = await Daily.find();
    res.json(daily);
  } catch (err) {
    console.error(err.message);
    res.status.send('Server Error');
  }
});

app.get('/api/archive', async (req, res) => {
  try {
    const archive = await Archive.find();
    res.json(archive);
  } catch (err) {
    console.error(err.message);
    res.status.send('Server Error');
  }
});

if (process.env.NODE_ENV === 'production') {
  //Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  wakeUpDyno('http://weather-compare-app.herokuapp.com');
});
