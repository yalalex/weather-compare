const mongoose = require('mongoose');

const ArchiveSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  max: {
    type: Number,
    required: true
  },
  min: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('archive', ArchiveSchema);
