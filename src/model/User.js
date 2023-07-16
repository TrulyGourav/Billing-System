const mongoose = require('mongoose');
const Cart = require('./Cart');
const Order = require('./Order');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
  },
  cart: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Cart', 
    default: null
  },
  orders: [{
    type: mongoose.Schema.Types.Mixed,
    ref: Order
  }]
});

module.exports = mongoose.model('User', userSchema);
