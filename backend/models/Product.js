const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  category: { type: String, required: true },
  image: { type: String },
  sold: { type: Number, default: 0 },     
  rating: { type: Number, default: 0 },   
}, { timestamps: true });

productSchema.index({ name: 'text', description: 'text' });

productSchema.index({ category: 1 });
productSchema.index({ price: 1 });
productSchema.index({ sold: -1 });

module.exports = mongoose.model('Product', productSchema);
