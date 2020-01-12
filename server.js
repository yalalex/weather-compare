const express = require('express');
const connectDB = require('./config/db');
const schedule = require('node-schedule');
const { getCurrent, getDaily } = require('./api/weather');

const Current = require('./models/Current');
const Daily = require('./models/Daily');
const Archive = require('./models/Archive');

const app = express();

connectDB();

const currentRule = new schedule.RecurrenceRule();
currentRule.minute = ['0', '10', '20', '30', '40', '50'];

const dailyRule = new schedule.RecurrenceRule();
dailyRule.hour = ['0', '12'];
dailyRule.minute = ['0'];

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

app.get('/api/archive/:city', async (req, res) => {
  try {
    const archive = await Archive.find({ name: req.params.city });
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
  schedule.scheduleJob(currentRule, function() {
    getCurrent();
  });
  schedule.scheduleJob(dailyRule, function() {
    getDaily();
  });
});
