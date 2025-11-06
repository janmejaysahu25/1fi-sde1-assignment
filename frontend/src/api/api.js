import axios from "axios";

// Base URL: use .env value if available, fallback to local backend
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";

// Axios instance
const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

// ==================== PRODUCTS ====================

// Fetch all products
export const fetchProducts = async () => {
  try {
    const res = await api.get("/products");
    return res.data.data || res.data;
  } catch (err) {
    console.error("❌ Error fetching products:", err.response?.data || err.message);
    throw err;
  }
};

// Fetch product by slug
export const fetchProductBySlug = async (slug) => {
  try {
    const res = await api.get(`/products/${slug}`);
    return res.data.data || res.data;
  } catch (err) {
    console.error("❌ Error fetching product:", err.response?.data || err.message);
    throw err;
  }
};

// ==================== CHECKOUT ====================

// Create checkout (order)
export const postCheckout = async (payload) => {
  try {
    const customerId = localStorage.getItem("customerId");
    if (!customerId) throw new Error("User not logged in / customerId missing");

    const res = await api.post("/checkout", {
      ...payload,
      customerId,
    });
    return res.data;
  } catch (err) {
    console.error("❌ Error during checkout:", err.response?.data || err.message);
    throw err;
  }
};

// ==================== AUTH / USERS ====================

// Signup
export const signupUser = async (user) => {
  try {
    const res = await api.post("/auth/signup", user);

    if (res.data.success && res.data.customerId) {
      localStorage.setItem("customerId", res.data.customerId);
    }

    return res.data;
  } catch (err) {
    console.error("❌ Error signing up:", err.response?.data || err.message);
    throw err;
  }
};

// Login
export const loginUser = async (credentials) => {
  try {
    const res = await api.post("/auth/signin", credentials);

    if (res.data.success && res.data.customerId) {
      localStorage.setItem("customerId", res.data.customerId);
    }

    return res.data;
  } catch (err) {
    console.error("❌ Error logging in:", err.response?.data || err.message);
    throw err;
  }
};

// Logout
export const logoutUser = () => {
  localStorage.removeItem("customerId");
};
