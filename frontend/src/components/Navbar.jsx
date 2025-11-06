import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiShoppingCart, FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const [search, setSearch] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(2); // example cart count
  const [cartModalOpen, setCartModalOpen] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Search for:", search);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/products/iphone17pro-allcolors.jpg"
              alt="Logo"
              className="h-8 w-auto"
            />
            <span className="font-bold text-xl text-sky-600">1Fi Store</span>
          </Link>

          {/* Desktop Search */}
          <div className="flex-1 hidden md:flex mx-4">
            <form onSubmit={handleSearchSubmit} className="flex w-full">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search for products, brands and more"
                className="flex-1 px-4 py-2 rounded-l-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-sky-600 text-white rounded-r-full hover:bg-sky-700 transition-all"
              >
                Search
              </button>
            </form>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/signin" className="text-gray-600 hover:text-sky-600">
              Sign In
            </Link>
            <Link
              to="/signup"
              className="px-3 py-1 bg-sky-600 text-white rounded-full hover:bg-sky-700 transition-all"
            >
              Sign Up
            </Link>
            <button
              onClick={() => setCartModalOpen(true)}
              className="relative text-gray-600 hover:text-sky-600"
            >
              <FiShoppingCart className="text-2xl" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-600 hover:text-sky-600"
            >
              {mobileMenuOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-sm px-4 py-3">
          <Link
            to="/"
            className="block py-2 text-gray-600 hover:text-sky-600"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/signin"
            className="block py-2 text-gray-600 hover:text-sky-600"
            onClick={() => setMobileMenuOpen(false)}
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className="block py-2 text-gray-600 hover:text-sky-600"
            onClick={() => setMobileMenuOpen(false)}
          >
            Sign Up
          </Link>
          <button
            onClick={() => { setCartModalOpen(true); setMobileMenuOpen(false); }}
            className="block py-2 text-gray-600 hover:text-sky-600 relative"
          >
            Cart
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Search */}
          <form onSubmit={handleSearchSubmit} className="flex gap-2 mt-3">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products"
              className="flex-1 px-3 py-2 rounded-l-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
            <button
              type="submit"
              className="px-3 py-2 bg-sky-600 text-white rounded-r-full hover:bg-sky-700 transition-all"
            >
              Go
            </button>
          </form>
        </div>
      )}

      {/* Cart Modal */}
      {cartModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-11/12 max-w-md shadow-lg relative">
            <button
              onClick={() => setCartModalOpen(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-sky-600"
            >
              <FiX className="text-xl" />
            </button>
            <h2 className="text-xl font-bold mb-4">Your Cart</h2>
            {cartCount > 0 ? (
              <p>{cartCount} item(s) in your cart</p>
            ) : (
              <p>Your cart is empty</p>
            )}
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setCartModalOpen(false)}
                className="px-4 py-2 bg-sky-600 text-white rounded-full hover:bg-sky-700 transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
