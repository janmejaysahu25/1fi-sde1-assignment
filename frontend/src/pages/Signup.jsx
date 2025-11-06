import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Validation
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

    // ✅ Save user
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    if (users.find((u) => u.email === form.email)) {
      setError("Email already registered.");
      return;
    }

    users.push(form);
    localStorage.setItem("users", JSON.stringify(users));

    // ✅ Navigate to signin
    navigate("/signin");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-sky-600 mb-6">
          Create Account
        </h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

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

          {/* ✅ Mobile number field */}
          <input
            type="text"
            name="mobile"
            placeholder="Mobile Number"
            value={form.mobile}
            onChange={handleChange}
            className="px-4 py-3 rounded-xl border focus:ring-2 focus:ring-sky-500 focus:outline-none"
          />

          <button
            type="submit"
            className="bg-sky-600 text-white py-3 rounded-xl font-semibold hover:bg-sky-700 transition"
          >
            Sign Up
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
