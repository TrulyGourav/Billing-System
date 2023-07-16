const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  itemType: {
    type: String,
    default: 'Service'
  }
});

module.exports = mongoose.model('Service', serviceSchema);
