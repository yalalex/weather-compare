const express = require('');
const connectDB = require('./config/db');
const getCurrent = require('./api/current');

const app = express();

connectDB();
getCurrent();

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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
