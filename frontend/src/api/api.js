import axios from 'axios';
const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';

export const fetchProducts = async () => {
  const res = await axios.get(`${API_BASE}/products`);
  return res.data.data;
};

export const fetchProductBySlug = async (slug) => {
  const res = await axios.get(`${API_BASE}/products/${slug}`);
  return res.data.data;
};

export const postCheckout = async (payload) => {
  const res = await axios.post(`${API_BASE}/checkout`, payload);
  return res.data;
};
