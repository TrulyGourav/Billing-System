const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  itemType: {
    type: String,
    default: 'Product'
  }
});

module.exports = mongoose.model('Product', productSchema);
