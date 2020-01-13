const mongoose = require('mongoose');

const DailySchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  data: {
    type: Array,
    required: true
  },
  date: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('daily', DailySchema);
