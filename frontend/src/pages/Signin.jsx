import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/api"; // ✅ import backend API

export default function Signin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await loginUser(form); // ✅ call backend
      if (res.success) {
        console.log("Login success:", res);

        // Save full user info in localStorage
        const userData = {
          customerId: res.customerId,
          name: res.name,
          email: res.email,
        };
        localStorage.setItem("currentUser", JSON.stringify(userData));

        // Trigger storage event to update Navbar instantly
        window.dispatchEvent(new Event("storage"));

        navigate("/"); // redirect to homepage or checkout
      } else {
        setError(res.error || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.error || "Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-sky-600 mb-6">
          Sign In
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
          <button
            type="submit"
            disabled={loading}
            className={`bg-sky-600 text-white py-3 rounded-xl font-semibold hover:bg-sky-700 transition ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
        <p className="text-center text-gray-500 mt-4">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-sky-600 cursor-pointer font-medium hover:underline"
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}
