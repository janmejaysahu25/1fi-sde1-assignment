const mongoose = require('mongoose');
const { Schema } = mongoose;

const OrderSchema = new Schema({
  orderId: { type: String, required: true, unique: true },
  productSlug: { type: String, required: true },
  variantId: { type: String },
  planId: { type: String },
  amount: { type: Number, required: true },
  tenureMonths: { type: Number },
  interestRatePercent: { type: Number },
  customer: {
    name: String,
    email: String,
    phone: String,
    address: String
  },
  status: { type: String, enum: ['pending', 'processing', 'completed', 'cancelled'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', OrderSchema);
