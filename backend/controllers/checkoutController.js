const Order = require("../models/Order");
const Product = require("../models/Product");
const Customer = require("../models/Customer");
const { nanoid } = require("nanoid");

exports.createOrder = async (req, res) => {
  try {
    const { productSlug, variantId, planId, customer } = req.body;

    console.log("--- createOrder: incoming req.body ---");
    console.log(req.body);

    if (!productSlug || !variantId || !planId || !customer) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const existingCustomer = await Customer.findOne({ customerId: customer.customerId });
    if (!existingCustomer) {
      return res.status(401).json({
        success: false,
        message: "Customer not registered. Please signup or login first.",
      });
    }

    const product = await Product.findOne({ slug: productSlug });
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    const matchedVariant = product.variants.find((v) => v.variantId === variantId);
    if (!matchedVariant) {
      return res.status(404).json({ success: false, message: "Variant not found" });
    }

    const matchedPlan = matchedVariant.emiPlans.find((p) => p.planId === planId);
    if (!matchedPlan) {
      console.log("Available plans:", matchedVariant.emiPlans.map((p) => p.planId));
      return res.status(404).json({
        success: false,
        message: `No EMI plan found for planId "${planId}". Available plans: ${matchedVariant.emiPlans
          .map((p) => p.planId)
          .join(", ")}`,
      });
    }

    const order = new Order({
      orderId: nanoid(10),
      productSlug,
      planId,
      amount: matchedPlan.totalPayable,
      customerId: customer.customerId, // store only string ID
      customer: {
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        address: customer.address,
        pincode: customer.pincode,
      },
      product: {
        name: product.name,
        brand: product.brand,
        seller: product.seller,
      },
      variant: {
        variantId: matchedVariant.variantId,
        name: matchedVariant.name,
        color: matchedVariant.color,
        storage: matchedVariant.storage,
        price: matchedVariant.price,
      },
      emiPlan: matchedPlan,
      status: "Pending",
    });

    await order.save();

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    console.error("❌ Error in createOrder:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
