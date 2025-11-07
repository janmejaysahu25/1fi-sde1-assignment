import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { signupUser } from "../api/api"; // ✅ make sure path is correct

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend Validation
    if (!form.name || !form.email || !form.password || !form.mobile) {
      Swal.fire("Error", "All fields are required!", "error");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      Swal.fire("Error", "Enter a valid email address.", "error");
      return;
    }
    if (form.password.length < 6) {
      Swal.fire("Error", "Password must be at least 6 characters.", "error");
      return;
    }
    if (!/^\d{10}$/.test(form.mobile)) {
      Swal.fire("Error", "Mobile number must be 10 digits.", "error");
      return;
    }

    try {
      setLoading(true);
      const res = await signupUser(form);

      // ✅ Check response correctly
      if (res.success) {
        Swal.fire("Success", "Account created successfully!", "success").then(() =>
          navigate("/signin")
        );
      } else if (res.error) {
        Swal.fire("Error", res.error, "error"); // Email or mobile already exists
      } else {
        Swal.fire("Error", "Signup failed. Try again.", "error");
      }
    } catch (err) {
      console.error("❌ Error signing up:", err);
      Swal.fire(
        "Error",
        err.response?.data?.error || "Server error. Try again.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-sky-600 mb-6">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="px-4 py-3 rounded-xl border focus:ring-2 focus:ring-sky-500 focus:outline-none"
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            className="px-4 py-3 rounded-xl border focus:ring-2 focus:ring-sky-500 focus:outline-none"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="px-4 py-3 rounded-xl border focus:ring-2 focus:ring-sky-500 focus:outline-none"
          />
          <input
            type="text"
            name="mobile"
            placeholder="Mobile Number"
            value={form.mobile}
            onChange={handleChange}
            maxLength={10}
            className="px-4 py-3 rounded-xl border focus:ring-2 focus:ring-sky-500 focus:outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-sky-600 text-white py-3 rounded-xl font-semibold hover:bg-sky-700 transition disabled:opacity-50"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-gray-500 mt-4">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/signin")}
            className="text-sky-600 cursor-pointer font-medium hover:underline"
          >
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
}
