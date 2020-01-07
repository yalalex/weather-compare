const mongoose = require('mongoose');

const ArchiveSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  temp: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('archive', ArchiveSchema);
