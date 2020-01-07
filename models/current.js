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
    type: Number,
    required: true
  },
  humidity: {
    type: Number,
    required: true
  },
  wind: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('current', CurrentSchema);
