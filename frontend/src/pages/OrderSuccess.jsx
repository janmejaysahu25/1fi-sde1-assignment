import React from "react";
import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

export default function OrderSuccess() {
  const location = useLocation();
  const order = location.state?.order || {};

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-green-50 to-white px-6 py-10">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white shadow-2xl rounded-3xl p-10 max-w-md w-full text-center border border-green-100"
      >
        {/* ✅ Success Icon */}
        <div className="flex justify-center mb-4">
          <CheckCircle size={80} className="text-green-500" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Order Placed Successfully 🎉
        </h1>

        <p className="text-gray-600 mb-6">
          Thank you for shopping with us! Your order has been successfully placed.
        </p>

        {/* ✅ Order Summary */}
        {order?.orderId && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 text-left">
            <p className="text-sm text-gray-700">
              <span className="font-semibold text-gray-900">Order ID:</span>{" "}
              {order.orderId}
            </p>
            <p className="text-sm text-gray-700 mt-1">
              <span className="font-semibold text-gray-900">Product:</span>{" "}
              {order.product?.name}
            </p>
            <p className="text-sm text-gray-700 mt-1">
              <span className="font-semibold text-gray-900">Amount:</span>{" "}
              ₹{order.amount?.toLocaleString()}
            </p>
          </div>
        )}

        {/* ✅ Go Home Button */}
        <Link
          to="/"
          className="inline-block bg-green-600 text-white px-6 py-3 rounded-xl font-semibold text-lg shadow-md hover:bg-green-700 transition"
        >
          Go to Home
        </Link>
      </motion.div>

      <p className="text-gray-500 text-sm mt-8">
        Need help?{" "}
        <a
          href="mailto:support@1fi.com"
          className="text-green-600 hover:underline"
        >
          Contact Support
        </a>
      </p>
    </div>
  );
}
