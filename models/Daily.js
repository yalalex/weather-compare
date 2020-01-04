const mongoose = require('mongoose');

const DailySchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  data: {
    type: array,
    required: true
  }
});

module.exports = mongoose.model('daily', DailySchema);
