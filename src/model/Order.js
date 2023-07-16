const mongoose = require('mongoose');
const Product = require('./Product');
const Service = require('./Service');

const orderSchema = new mongoose.Schema({
  orderDate: {
    type: Date,
    default: Date.now,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  items: [
    {
      itemType: {
        type: String,
        enum: ['Product', 'Service'],
        required: true,
      },
      item: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'items.itemType',
      },
    },
  ],
});

module.exports = mongoose.model('Order', orderSchema);