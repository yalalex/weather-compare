const express = require('express');
const router = express.Router();

const Current = require('../models/Current');
const Daily = require('../models/Daily');
const Archive = require('../models/Archive');

router.get('/current', async (req, res) => {
  const names = Object.values(req.query);
  try {
    const current = await Current.find({ name: names });
    res.json(current);
  } catch (err) {
    console.error(err.message);
    res.status.send('Get current weather error');
  }
});

router.get('/daily', async (req, res) => {
  const names = Object.values(req.query);
  try {
    const daily = await Daily.find({ name: names });
    res.json(daily);
  } catch (err) {
    console.error(err.message);
    res.status.send('Get daily weather error');
  }
});

router.get('/archive', async (req, res) => {
  const names = Object.values(req.query);
  try {
    const archive = await Archive.find({ name: names });
    res.json(archive);
  } catch (err) {
    console.error(err.message);
    res.status.send('Get archived weather error');
  }
});

module.exports = router;
