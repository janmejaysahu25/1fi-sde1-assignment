import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../api/api"; // make sure the path is correct

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Frontend Validation
    if (!form.name || !form.email || !form.password || !form.mobile) {
      setError("All fields are required!");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      setError("Enter a valid email address.");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (!/^\d{10}$/.test(form.mobile)) {
      setError("Mobile number must be 10 digits.");
      return;
    }

    try {
      setLoading(true);
      const res = await signupUser(form); // ✅ call the api function

      if (res.success) {
        setSuccess("Account created successfully! Redirecting...");
        setTimeout(() => navigate("/signin"), 1500);
      } else {
        setError(res.error || "Signup failed.");
      }
    } catch (err) {
      console.error(err);
      setError(err.message || "Server error. Try again.");
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

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && <p className="text-green-600 text-center mb-4">{success}</p>}

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
