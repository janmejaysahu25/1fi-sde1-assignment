import axios from "axios";

// Base URL: use .env value if available, fallback to local backend
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";

// Create an axios instance (so you can add headers/interceptors easily later)
const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🟢 Fetch all products
export const fetchProducts = async () => {
  try {
    const res = await api.get("/products");
    // Return either res.data.data (if your backend wraps in {data: ...}) or res.data directly
    return res.data.data || res.data;
  } catch (err) {
    console.error("❌ Error fetching products:", err.message);
    throw err;
  }
};

// 🟢 Fetch product by slug (e.g., /api/products/apple-iphone-17-pro)
export const fetchProductBySlug = async (slug) => {
  try {
    const res = await api.get(`/products/${slug}`);
    return res.data.data || res.data;
  } catch (err) {
    console.error("❌ Error fetching product:", err.message);
    throw err;
  }
};

// 🟢 Create checkout (order) — sends payload like { productId, planId, variantId, user }
export const postCheckout = async (payload) => {
  try {
    const res = await api.post("/checkout", payload);
    return res.data;
  } catch (err) {
    console.error("❌ Error during checkout:", err.message);
    throw err;
  }
};
