const express = require('');
const connectDB = require('./config/db');
const { getCurrent, getDaily } = require('./api/weather');

const Current = require('./models/Current');
const Daily = require('./models/Daily');

const app = express();

connectDB();

getCurrent();
getDaily();

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

app.get('/api/daily', (req, res) => {
    try {
        const daily = await Daily.find();
        res.json(daily);
      } catch (err) {
        console.error(err.message);
        res.status.send('Server Error');
      }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
