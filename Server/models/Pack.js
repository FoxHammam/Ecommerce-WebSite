const mongoose = require('mongoose');

const packSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  oldPrice: {
    type: Number,
    min: 0
  },
  category: {
    type: String,
    default: 'Bundle',
    trim: true
  },
  itemsIncluded: {
    type: [String],
    required: true
  },
  bestSeller: {
    type: Boolean,
    default: false
  },
  description: {
    type: String,
    trim: true
  },
  inStock: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Pack', packSchema);

