const mongoose = require('mongoose');

const ArchiveSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  data: {
    type: Array,
    required: true
  }
});

module.exports = mongoose.model('archive', ArchiveSchema);
