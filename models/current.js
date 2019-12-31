const mongoose = require('mongoose');

const CurrentSchema = mongoose.Schema({
  city: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'current'
  },
  name: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  currentT: {
    type: String,
    required: true
  },
  minMaxT: {
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
  },
  pressure: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('current', CurrentSchema);
