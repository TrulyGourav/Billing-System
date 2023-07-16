const mongoose = require('mongoose');
const User = require('./User');

const cartSchema = new mongoose.Schema({
    user:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    items: [{ 
        type: mongoose.Schema.Types.Mixed,
        ref: 'Product',
    }],
  });
  
module.exports = mongoose.model('Cart', cartSchema);