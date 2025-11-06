const mongoose = require("mongoose");
const { Schema } = mongoose;

const OrderSchema = new Schema(
  {
    orderId: { type: String, required: true, unique: true },
    productSlug: { type: String, required: true },
    planId: { type: String, required: true },
    amount: { type: Number, required: true }, // total amount or EMI total
    customer: {
      name: String,
      email: String,
      phone: String,
      address: String,
      pincode: String,
    },
    product: {
      name: String,
      brand: String,
      seller: String,
    },
    variant: {
      variantId: String,
      name: String,
      color: String,
      storage: String,
      price: Number,
    },
    emiPlan: {
      planId: String,
      tenureMonths: Number,
      interestRatePercent: Number,
      monthlyAmount: Number,
      totalPayable: Number,
    },
    status: { type: String, default: "Pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
