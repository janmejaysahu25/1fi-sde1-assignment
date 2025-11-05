import React, { useState, useEffect } from 'react';
import { postCheckout } from '../api/api';
import { useNavigate } from 'react-router-dom';

export default function Checkout(){
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [productSelection, setProductSelection] = useState(null);
  const [customer, setCustomer] = useState({ name: '', email: '', phone: '' });
  const [message, setMessage] = useState(null);

  useEffect(()=>{
    // retrieve selection from localStorage (set by ProductPage)
    const sel = localStorage.getItem('selectedOrder');
    if(sel) setProductSelection(JSON.parse(sel));
  },[]);

  const handleChange = (e) => {
    setCustomer(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!productSelection) return setMessage('No product selected');
    if(!customer.name) return setMessage('Please enter your name');

    setLoading(true);
    try {
      const payload = {
        productSlug: productSelection.productSlug,
        variantId: productSelection.variantId,
        planId: productSelection.planId,
        customer,
      };
      const res = await postCheckout(payload);
      setMessage('Order created: ' + res.data.orderId);
      // clear selection
      localStorage.removeItem('selectedOrder');
      // optionally navigate to a success page
      navigate('/', { replace: true });
    } catch (err) {
      console.error(err);
      setMessage('Failed to create order');
    } finally {
      setLoading(false);
    }
  };

  if(!productSelection) return <div className="text-center py-20">No product selected. Go back and choose an EMI plan.</div>

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Checkout</h2>
      <div className="mb-4">
        <div className="font-medium">{productSelection.productName}</div>
        <div className="text-sm text-gray-500">Plan: {productSelection.planId} • Monthly ₹{Number(productSelection.monthly).toLocaleString()}</div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm">Name</label>
          <input name="name" value={customer.name} onChange={handleChange} className="w-full border p-2 rounded" />
        </div>
        <div>
          <label className="block text-sm">Email</label>
          <input name="email" value={customer.email} onChange={handleChange} className="w-full border p-2 rounded" />
        </div>
        <div>
          <label className="block text-sm">Phone</label>
          <input name="phone" value={customer.phone} onChange={handleChange} className="w-full border p-2 rounded" />
        </div>

        <div>
          <button className="px-4 py-2 bg-sky-600 text-white rounded" disabled={loading}>{loading ? 'Processing...' : 'Place Order'}</button>
        </div>
      </form>
      {message && <div className="mt-4 text-sm text-gray-700">{message}</div>}
    </div>
  );
}
