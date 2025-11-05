require('dotenv').config();
const connectDB = require('../config/db');
const Product = require('../models/Product');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/1fi_assignment';

const seed = async () => {
  await connectDB(MONGODB_URI);
  await Product.deleteMany({});

  const products = [
    {
      name: 'Apple iPhone 17 Pro (Silver, 256 GB)',
      slug: 'apple-iphone-17-pro-silver-256-gb',
      brand: 'Apple',
      seller: 'Balaji Infocom',
      mrp: 134900,
      price: 134900,
      images: [
        'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1200&q=80',
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&q=80'
      ],
      specs: {
        Storage: '256 GB',
        Color: 'Silver',
        'Front Camera': '18MP',
        'Rear Camera': '48MP + 48MP + 48MP',
        'Screen Size': '6.3 inch',
        Resolution: '2622 x 1206'
      },
      variants: [
        { variantId: 'v1', color: 'Silver', storage: '256 GB', sku: 'IP17P-256-SLV', images: [], price: 134900 },
        { variantId: 'v2', color: 'Deep Blue', storage: '256 GB', sku: 'IP17P-256-DB', images: [], price: 134900 }
      ],
      emiPlans: [
        { planId: 'p3', tenureMonths: 3, interestRatePercent: 0, cashbackAmount: 0, monthlyAmount: +(134900/3).toFixed(2), totalPayable: 134900 },
        { planId: 'p6', tenureMonths: 6, interestRatePercent: 0, cashbackAmount: 0, monthlyAmount: +(134900/6).toFixed(2), totalPayable: 134900 },
        { planId: 'p12', tenureMonths: 12, interestRatePercent: 0, cashbackAmount: 0, monthlyAmount: +(134900/12).toFixed(2), totalPayable: 134900 }
      ]
    },
    {
      name: 'Samsung Galaxy S24 Ultra (Black, 256 GB)',
      slug: 'samsung-galaxy-s24-ultra-256gb',
      brand: 'Samsung',
      seller: 'Galaxy Store',
      mrp: 119999,
      price: 119999,
      images: ['https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=1200&q=80'],
      specs: { Storage: '256 GB', Color: 'Black' },
      variants: [
        { variantId: 's1', color: 'Black', storage: '256 GB', sku: 'SGS24-256-BLK', images: [], price: 119999 },
        { variantId: 's2', color: 'Green', storage: '256 GB', sku: 'SGS24-256-GRN', images: [], price: 119999 }
      ],
      emiPlans: [
        { planId: 'sp6', tenureMonths: 6, interestRatePercent: 0, cashbackAmount: 0, monthlyAmount: +(119999/6).toFixed(2), totalPayable: 119999 },
        { planId: 'sp12', tenureMonths: 12, interestRatePercent: 5, cashbackAmount: 1000, monthlyAmount: +((119999*1.05)/12).toFixed(2), totalPayable: Math.round(119999*1.05) }
      ]
    },
    {
      name: 'OnePlus 12 (Titan, 256 GB)',
      slug: 'oneplus-12-titan-256gb',
      brand: 'OnePlus',
      seller: 'OnePlus India',
      mrp: 69999,
      price: 69999,
      images: ['https://images.unsplash.com/photo-1526178611008-4a8b6b0a3bd3?w=1200&q=80'],
      specs: { Storage: '256 GB', Color: 'Titan' },
      variants: [
        { variantId: 'o1', color: 'Titan', storage: '256 GB', sku: 'OP12-256-TIT', images: [], price: 69999 },
        { variantId: 'o2', color: 'Glacier', storage: '256 GB', sku: 'OP12-256-GLA', images: [], price: 69999 }
      ],
      emiPlans: [
        { planId: 'op6', tenureMonths: 6, interestRatePercent: 0, cashbackAmount: 0, monthlyAmount: +(69999/6).toFixed(2), totalPayable: 69999 },
        { planId: 'op12', tenureMonths: 12, interestRatePercent: 8, cashbackAmount: 0, monthlyAmount: +((69999*1.08)/12).toFixed(2), totalPayable: Math.round(69999*1.08) }
      ]
    }
  ];

  await Product.insertMany(products);
  console.log('Seeded products');
  process.exit(0);
};

seed().catch(err => console.error(err));
