const mongoose = require('mongoose');
const { Schema } = mongoose;

const VariantSchema = new Schema({
  variantId: String,
  color: String,
  storage: String,
  sku: String,
  images: [String],
  price: Number
});

const EMIPlanSchema = new Schema({
  planId: String,
  tenureMonths: Number,
  interestRatePercent: Number,
  cashbackAmount: Number,
  monthlyAmount: Number,
  totalPayable: Number
});

const ProductSchema = new Schema({
  name: String,
  slug: { type: String, unique: true },
  brand: String,
  seller: String,
  mrp: Number,
  price: Number,
  currency: { type: String, default: 'INR' },
  images: [String],
  specs: { type: Map, of: String },
  variants: [VariantSchema],
  emiPlans: [EMIPlanSchema]
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);
