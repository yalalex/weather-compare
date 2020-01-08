const express = require('express');
const connectDB = require('./config/db');
const schedule = require('node-schedule');
const { getCurrent, getDaily } = require('./api/weather');

const Current = require('./models/Current');
const Daily = require('./models/Daily');
const Archive = require('./models/Archive');

const app = express();

connectDB();

schedule.scheduleJob('*/5 * * * *', function() {
  getCurrent();
});
schedule.scheduleJob('0 */12 * * *', function() {
  getDaily();
});
// schedule.scheduleJob('* 12 * * *', getDaily());

app.get('/', (req, res) => res.json({ msg: 'Welcome to Weather Compare' }));

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

app.get('/api/archive/:city', async (req, res) => {
  try {
    const archive = await Archive.find({ name: req.params.city });
    res.json(archive);
  } catch (err) {
    console.error(err.message);
    res.status.send('Server Error');
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
