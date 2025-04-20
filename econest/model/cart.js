const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Products',
  }
});

module.exports = mongoose.model('cart', cartSchema);