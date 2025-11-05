const Order = require('../models/Order');
const Product = require('../models/Product');
const { nanoid } = require('nanoid');

exports.createOrder = async (req, res) => {
  try {
    const { productSlug, variantId, planId, customer } = req.body;
    if (!productSlug || !planId || !customer || !customer.name) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    // fetch product & plan to calculate amount and validate
    const product = await Product.findOne({ slug: productSlug });
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

    const plan = product.emiPlans.find(p => p.planId === planId);
    if (!plan) return res.status(400).json({ success: false, message: 'EMI plan not found for this product' });

    const amount = plan.totalPayable || plan.monthlyAmount * plan.tenureMonths || product.price;

    // create order record
    const order = new Order({
      orderId: 'ORD-' + nanoid(8).toUpperCase(),
      productSlug,
      variantId: variantId || null,
      planId,
      amount,
      tenureMonths: plan.tenureMonths,
      interestRatePercent: plan.interestRatePercent,
      customer,
      status: 'processing'
    });

    await order.save();

    return res.status(201).json({ success: true, data: { orderId: order.orderId, status: order.status } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
