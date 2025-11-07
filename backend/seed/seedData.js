/**
 * ✅ Fully Updated Seed Script for 1Fi Assignment
 */

require("dotenv").config();
const connectDB = require("../config/db");
const Product = require("../models/Product");

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/1fi_assignment";

// Helper to get local image path
const localImg = (file) => `/products/${file}`;

// EMI template
const emiTemplate = [
  { tenureMonths: 3, interestRatePercent: 0 },
  { tenureMonths: 6, interestRatePercent: 0 },
  { tenureMonths: 9, interestRatePercent: 5 },
  { tenureMonths: 12, interestRatePercent: 8 },
];

// Generate EMI plans for a given price and optional cashback
const generateEmiPlans = (price, cashback = 0) => {
  return emiTemplate.map((plan) => {
    const totalPayable = Math.round(price * (1 + plan.interestRatePercent / 100));
    return {
      planId: `${plan.tenureMonths}-emi-${plan.interestRatePercent}`,
      tenureMonths: plan.tenureMonths,
      interestRatePercent: plan.interestRatePercent,
      monthlyAmount: Number((totalPayable / plan.tenureMonths).toFixed(2)),
      totalPayable,
      ...(cashback ? { cashbackAmount: cashback } : {}),
    };
  });
};

// ---------------------------
// PRODUCT DATA
// ---------------------------
const products = [
  {
    name: "Apple iPhone 17 Pro",
    slug: "apple-iphone-17-pro",
    brand: "Apple",
    seller: "Balaji Infocom",
    highlights: [
      "6.7-inch OLED Display",
      "256 GB Storage",
      "48MP + 12MP Camera",
      "4200 mAh Battery",
      "A18 Bionic Chip",
      "8 GB RAM",
      "Easy Payment Options",
      "EMI starting from ₹6,299/month",
      "Cash on Delivery available",
      "Net banking & Credit/Debit/ATM card",
      "GST invoice available",
    ],
    images: [
      localImg("iphone17pro-front-back.jpg"),
      localImg("iphone17pro-back.jpg"),
      localImg("iphone17pro-side.jpg"),
      localImg("iphone17pro-usb.jpg"),
    ],
    specs: {
      display: "6.7-inch OLED",
      storage: "256 GB",
      camera: "48MP + 12MP",
      battery: "4200 mAh",
      processor: "A18 Bionic Chip",
      ram: "8 GB",
    },
    variants: [
      {
        variantId: "iphone17p-silver-256",
        name: "Silver / 256GB",
        color: "Silver",
        storage: "256",
        sku: "IP17P-S-256",
        price: 79999,
        images: [
          localImg("silver17probackfront.jpg"),
          localImg("silver17proback.jpg"),
          localImg("silver17proside.jpg"),
          localImg("silver17prowithusb.jpg"),
        ],
      },
      {
        variantId: "iphone17p-black-512",
        name: "Black / 512GB",
        color: "Black",
        storage: "512",
        sku: "IP17P-B-512",
        price: 84999,
        images: [
          localImg("iphone17pro-blue-front-back.jpg"),
          localImg("iphone17pro-blue-back.jpg"),
          localImg("iphone17pro-blue-side.jpg"),
          localImg("iphone17pro-blue-usb.jpg"),
        ],
      },
      {
        variantId: "iphone17p-orange-256",
        name: "Orange / 256GB",
        color: "Orange",
        storage: "256",
        sku: "IP17P-O-256",
        price: 72999,
        images: [
          localImg("iphone17pro-front-back.jpg"),
          localImg("iphone17pro-camera.jpg"),
          localImg("iphone17pro-side.jpg"),
          localImg("iphone17pro-usb.jpg"),
        ],
      },
    ],
  },

  {
    name: "Samsung Galaxy S24 Ultra (Phantom Black, 256 GB)",
    slug: "samsung-galaxy-s24-ultra-phantom-black-256-gb",
    brand: "Samsung",
    seller: "BigBillionDealz",
    highlights: [
      "12 GB RAM | 256 GB ROM",
      "6.8-inch Quad HD+ AMOLED Display",
      "200MP + 50MP + 12MP + 10MP | 12MP Front Camera",
      "5000 mAh Battery",
      "Snapdragon 8 Gen 3 Processor",
      "Easy Payment Options",
      "Cash on Delivery",
      "Net banking & Credit/ Debit/ ATM card",
      "GST invoice available",
    ],
    images: [
      localImg("s24ultraallblack.jpg"),
      localImg("s24ultrablackback.jpg"),
      localImg("s24ultrablackside.jpg"),
      localImg("s24ultragreyfront.jpg"),
    ],
    specs: {
      display: "6.8-inch Quad HD+ AMOLED",
      storage: "256 GB",
      camera: "200MP + 50MP + 12MP + 10MP | 12MP Front",
      battery: "5000 mAh",
      processor: "Snapdragon 8 Gen 3",
      ram: "12 GB",
    },
    variants: [
      {
        variantId: "s24u-black-256",
        name: "Phantom Black / 256GB",
        color: "Phantom Black",
        storage: "256",
        sku: "S24U-B-256",
        price: 119999,
        images: [
          localImg("s24ultraallblack.jpg"),
          localImg("s24ultrablackback.jpg"),
          localImg("s24ultrablackside.jpg"),
          localImg("s24ultragreyfront.jpg"),
        ],
      },
      {
        variantId: "s24u-green-512",
        name: "Green / 512GB",
        color: "Green",
        storage: "512",
        sku: "S24U-G-512",
        price: 134999,
        images: [
          localImg("s24ultragbackgrey.jpg"),
          localImg("s24ultragreyfront.jpg"),
          localImg("s24ultragreyside.jpg"),
          localImg("s24ultraallblack.jpg"),
        ],
      },
    ],
  },

  {
    name: "Google Pixel X (Storm Blue, 128 GB)",
    slug: "google-pixel-x-storm-blue-128-gb",
    brand: "Google",
    seller: "PixelStore",
    highlights: [
      "6.4-inch OLED Display",
      "128 GB Storage",
      "50MP Rear Camera | 12MP Front Camera",
      "4200 mAh Battery",
      "Snapdragon 7 Gen 2 Processor",
      "Easy Payment Options",
      "Cash on Delivery",
      "Net banking & Credit/Debit/ATM card",
      "GST invoice available",
    ],
    images: [
      localImg("googlepixelall.jpg"),
      localImg("googlepixelbackwhite.jpg"),
      localImg("googlepixelstrombluefront.jpg"),
      localImg("googlepixelwhitescreen.jpg"),
    ],
    specs: {
      display: "6.4-inch OLED",
      storage: "128 GB",
      camera: "50MP | 12MP Front",
      battery: "4200 mAh",
      processor: "Snapdragon 7 Gen 2",
      ram: "8 GB",
    },
    variants: [
      {
        variantId: "pixelx-blue-128",
        name: "Storm Blue / 128GB",
        color: "Storm Blue",
        storage: "128",
        sku: "PX-B-128",
        price: 64999,
        cashbackAmount: 7500,
        images: [
          localImg("googlepixelstrombluefront.jpg"),
          localImg("googlepixelstromblue.jpg"),
          localImg("googlepixelstromblueback.jpg"),
          localImg("googlepixelwhiteside.jpg"),
        ],
      },
      {
        variantId: "pixelx-white-256",
        name: "Snow / 256GB",
        color: "White",
        storage: "256",
        sku: "PX-W-256",
        price: 72999,
        images: [
          localImg("googlepixelwhite.jpg"),
          localImg("googlepixelwhitescreen.jpg"),
          localImg("googlepixelwhiteside.jpg"),
          localImg("googlepixelbackwhite.jpg"),
        ],
      },
    ],
  },
];

// ---------------------------
// Add price, mrp, EMI, and ensure specs for variants
// ---------------------------
products.forEach((product) => {
  const minPrice = Math.min(...product.variants.map((v) => v.price));
  const maxMRP = Math.max(...product.variants.map((v) => v.price));

  product.price = minPrice;
  product.mrp = maxMRP;

  product.specs = product.specs || {};

  product.variants = product.variants.map((variant) => ({
    ...variant,
    specs: variant.specs || { ...product.specs },
    emiPlans: generateEmiPlans(variant.price, variant.cashbackAmount || 0),
  }));
});

// ---------------------------
// SEED FUNCTION
// ---------------------------
const seed = async () => {
  try {
    await connectDB(MONGODB_URI);
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log("✅ Seeded products:", products.map((p) => p.slug));
    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding error:", err);
    process.exit(1);
  }
};

seed();
