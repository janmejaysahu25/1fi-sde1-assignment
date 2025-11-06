const Product = require("../models/Product");

// -----------------------------
// Helper: Generate EMI Plans
// -----------------------------
const emiTemplate = [
  { tenureMonths: 3, interestRatePercent: 0 },
  { tenureMonths: 6, interestRatePercent: 0 },
  { tenureMonths: 9, interestRatePercent: 5 },
  { tenureMonths: 12, interestRatePercent: 8 },
];

const generateEmiPlans = (price, cashback = 0) => {
  return emiTemplate.map((plan) => {
    const totalPayable = Math.round(price * (1 + plan.interestRatePercent / 100));
    return {
      planId: `${plan.tenureMonths}-emi-${plan.interestRatePercent}`,
      tenureMonths: plan.tenureMonths,
      interestRatePercent: plan.interestRatePercent,
      monthlyAmount: Number((totalPayable / plan.tenureMonths).toFixed(2)),
      totalPayable,
      cashbackAmount: cashback || 0,
    };
  });
};

// -----------------------------
// GET ALL PRODUCTS
// -----------------------------
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({}, "name slug price mrp images specs seller variants");

    const productsWithEmi = products.map((product) => {
      const variantsWithEmi = product.variants.map((variant) => ({
        ...variant.toObject(),
        emiPlans: generateEmiPlans(variant.price, variant.cashbackAmount || 0),
      }));

      return {
        ...product.toObject(),
        variants: variantsWithEmi,
      };
    });

    res.json({ success: true, data: productsWithEmi });
  } catch (err) {
    console.error("❌ Error fetching products:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// -----------------------------
// GET PRODUCT BY SLUG
// -----------------------------
exports.getProductBySlug = async (req, res) => {
  try {
    const slug = req.params.slug;
    const product = await Product.findOne({ slug });

    if (!product)
      return res.status(404).json({ success: false, message: "Product not found" });

    const variantsWithEmi = product.variants.map((variant) => ({
      ...variant.toObject(),
      emiPlans: generateEmiPlans(variant.price, variant.cashbackAmount || 0),
    }));

    res.json({
      success: true,
      data: {
        ...product.toObject(),
        variants: variantsWithEmi,
      },
    });
  } catch (err) {
    console.error("❌ Error fetching product by slug:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
