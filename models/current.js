const mongoose = require('mongoose');

const CurrentSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  time: {
    type: Date,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  conditions: {
    type: String,
    required: true
  },
  temp: {
    type: String,
    required: true
  },
  humidity: {
    type: String,
    required: true
  },
  wind: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('current', CurrentSchema);
