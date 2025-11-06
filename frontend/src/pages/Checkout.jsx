import React, { useState, useEffect } from "react";
import { postCheckout } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [productSelection, setProductSelection] = useState(null);
  const [message, setMessage] = useState(null);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    pincode: "",
  });

  // Load selected product from localStorage
  useEffect(() => {
    const sel = localStorage.getItem("selectedOrder");
    if (sel) setProductSelection(JSON.parse(sel));
  }, []);

  const handleChange = (e) => {
    setCustomer((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Submit order to backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    const customerId = localStorage.getItem("customerId");
    if (!customerId) {
      // Show login popup if user is not logged in
      setShowLoginPopup(true);
      return;
    }

    if (!productSelection)
      return setMessage("No product selected.");
    if (!customer.name) return setMessage("Please enter your name");
    if (!customer.address) return setMessage("Please enter your address");
    if (!customer.pincode) return setMessage("Please enter your pincode");

    setLoading(true);
    try {
      const payload = {
        productSlug:
          productSelection.productSlug ||
          productSelection.slug ||
          productSelection.productName?.toLowerCase().replace(/\s+/g, "-"),
        variantId: productSelection.variantId,
        planId: productSelection.planId,
        customer: { ...customer, customerId },
      };

      console.log("🚀 Sending checkout payload:", payload);

      const response = await postCheckout(payload);
      console.log("✅ Backend response:", response);

      if (response?.success) {
        setMessage("✅ Your order has been placed successfully!");
        localStorage.removeItem("selectedOrder");
        setTimeout(() => navigate("/order-success", { replace: true }), 1500);
      } else {
        setMessage(response?.message || "❌ Failed to create order.");
      }
    } catch (err) {
      console.error("❌ Checkout error:", err);
      setMessage("❌ Failed to create order. Try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!productSelection)
    return (
      <div className="text-center py-20 text-gray-600 text-lg">
        No product selected.
        <br />
        Go back and choose an EMI plan.
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-900 text-center md:text-left">
        Complete Your Purchase
      </h1>

      {/* Product Summary */}
      <div className="bg-white shadow-lg rounded-2xl border p-6 flex flex-col md:flex-row md:justify-between md:items-center gap-6">
        <div className="flex items-center gap-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {productSelection.productName || "Product"}
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Variant:{" "}
              <span className="font-medium">
                {productSelection.variantName}
              </span>
            </p>
            <p className="text-gray-500 text-sm mt-1">
              EMI Plan:{" "}
              <span className="font-medium">{productSelection.planId}</span>
            </p>
          </div>
        </div>

        <div className="text-right">
          <p className="text-lg font-bold text-gray-900">
            ₹{Number(productSelection.monthlyAmount).toLocaleString()}
            <span className="text-sm text-gray-500 ml-1">
              / month × {productSelection.tenureMonths}
            </span>
          </p>
          <p className="text-gray-600 text-sm mt-1">
            Total:{" "}
            <span className="font-semibold">
              ₹{Number(productSelection.totalPayable).toLocaleString()}
            </span>
          </p>
          {productSelection.cashback && (
            <p className="text-green-600 font-semibold mt-1">
              💰 Cashback: ₹
              {Number(productSelection.cashback).toLocaleString()}
            </p>
          )}
        </div>
      </div>

      {/* Customer Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl border p-6 space-y-6"
      >
        <h3 className="text-xl font-semibold text-gray-900">Your Details</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Full Name</label>
            <input
              name="name"
              value={customer.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Email Address</label>
            <input
              name="email"
              value={customer.email}
              onChange={handleChange}
              type="email"
              placeholder="you@example.com"
              className="border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div className="flex flex-col md:col-span-2">
            <label className="text-sm font-medium mb-1">Phone Number</label>
            <input
              name="phone"
              value={customer.phone}
              onChange={handleChange}
              placeholder="9876543210"
              className="border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div className="flex flex-col md:col-span-2">
            <label className="text-sm font-medium mb-1">Address</label>
            <textarea
              name="address"
              value={customer.address}
              onChange={handleChange}
              placeholder="House No, Street, Area, City"
              className="border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div className="flex flex-col md:col-span-2">
            <label className="text-sm font-medium mb-1">Pincode</label>
            <input
              name="pincode"
              value={customer.pincode}
              onChange={handleChange}
              placeholder="Enter 6-digit Pincode"
              pattern="[0-9]{6}"
              maxLength={6}
              className="border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-4 rounded-xl text-white font-bold text-lg transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800"
          }`}
        >
          {loading ? "Processing..." : "Place Order"}
        </button>
      </form>

      {message && (
        <div className="text-center bg-blue-50 border border-blue-200 text-blue-700 p-4 rounded-xl">
          {message}
        </div>
      )}

      {/* =================== LOGIN POPUP =================== */}
      {showLoginPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full text-center">
            <h3 className="text-xl font-bold mb-4">Login Required</h3>
            <p className="mb-6">
              You need to log in before proceeding with EMI checkout.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  setShowLoginPopup(false);
                  navigate("/signin"); // redirect to Sign In page
                }}
                className="bg-sky-600 text-white px-4 py-2 rounded-xl hover:bg-sky-700 transition"
              >
                Login
              </button>
              <button
                onClick={() => setShowLoginPopup(false)}
                className="bg-gray-300 px-4 py-2 rounded-xl hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
