const express = require('express');
const connectDB = require('./config/db');
const schedule = require('node-schedule');
const { getCurrent, getDaily } = require('./src/weather');

const wakeUpDyno = require('./utils/wakeUpDyno');

const app = express();

connectDB();

getCurrent();

const currentRule = new schedule.RecurrenceRule();
currentRule.minute = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
schedule.scheduleJob(currentRule, function () {
  getCurrent();
});

const dailyRule = new schedule.RecurrenceRule();
dailyRule.hour = [2, 8, 14, 20];
dailyRule.minute = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
schedule.scheduleJob(dailyRule, function () {
  getDaily();
});

app.use(
  express.json({
    extended: false,
  })
);

app.use('/api', require('./src/routes'));

if (process.env.NODE_ENV === 'production') {
  //Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  wakeUpDyno('http://w-compare.herokuapp.com');
  // console.log(`Server is running on port ${PORT}`);
});
