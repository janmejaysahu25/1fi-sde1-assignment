const mongoose = require('mongoose');
const { Schema } = mongoose;

// ✅ Variant Schema with EMI plans
const VariantSchema = new Schema({
  variantId: { type: String, required: true },
  name: String,            // e.g., "Silver / 256GB"
  color: String,
  storage: String,
  sku: String,
  images: [String],
  price: Number,
  cashbackAmount: { type: Number, default: 0 }, // optional cashback per variant
  emiPlans: [
    {
      planId: { type: String, required: true },
      tenureMonths: Number,
      interestRatePercent: Number,
      monthlyAmount: Number,
      totalPayable: Number,
      cashbackAmount: Number,
      description: String,
    }
  ]
}, { _id: false });

// ✅ Product Schema
const ProductSchema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  brand: String,
  seller: String,
  mrp: Number,
  price: Number, // base price (optional, can be min of variants)
  currency: { type: String, default: 'INR' },
  images: [String],
specs: {
  type: Object,
  default: {},
},
  variants: [VariantSchema], // variants now include EMI plans
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);
