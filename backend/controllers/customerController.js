const Customer = require("../models/Customer");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

// =================== SIGNUP ===================
exports.signup = async (req, res) => {
  try {
    const { name, email, password, mobile } = req.body;

    if (!name || !email || !password || !mobile) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existing = await Customer.findOne({ email });
    if (existing) return res.status(400).json({ error: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const customer = new Customer({
      customerId: uuidv4(),
      name,
      email,
      password: hashedPassword,
      mobile,
    });

    await customer.save();
    return res.status(201).json({ success: true, customerId: customer.customerId });
  } catch (err) {
    console.error("Signup Error:", err);
    return res.status(500).json({ error: "Server error" });
  }
};

// =================== SIGNIN ===================
exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("Signin attempt:", email);

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await Customer.findOne({ email });
    if (!user) {
      console.log("User not found");
      return res.status(400).json({ error: "Invalid email or password" });
    }

    console.log("User found:", user.email);
    console.log("Password hash:", user.password);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Password mismatch");
      return res.status(400).json({ error: "Invalid email or password" });
    }

    console.log("Signin successful for:", user.email);

    return res.status(200).json({
      success: true,
      customerId: user.customerId,
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    console.error("Signin Error:", err);
    return res.status(500).json({ error: "Server error" });
  }
};
