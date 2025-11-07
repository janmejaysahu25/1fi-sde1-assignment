import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiShoppingCart, FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const [search, setSearch] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartModalOpen, setCartModalOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const cartKey = "cart";
  const userKey = "currentUser";

  // Load cart and user on mount
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem(cartKey) || "[]");
    setCartItems(storedCart);

    const storedUser = JSON.parse(localStorage.getItem(userKey));
    if (storedUser) setUser(storedUser);
  }, []);

  // Listen to localStorage changes for login/logout/cart updates
  useEffect(() => {
    const handleStorageChange = () => {
      const updatedCart = JSON.parse(localStorage.getItem(cartKey) || "[]");
      setCartItems(updatedCart);

      const updatedUser = JSON.parse(localStorage.getItem(userKey));
      setUser(updatedUser);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const updateCart = (newCart) => {
    setCartItems(newCart);
    localStorage.setItem(cartKey, JSON.stringify(newCart));
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    navigate(`/search?q=${encodeURIComponent(search.trim())}`);
  };

  const handleRemoveItem = (variantId, planId) => {
    const updatedCart = cartItems.filter(
      (item) => !(item.variantId === variantId && item.planId === planId)
    );
    updateCart(updatedCart);
  };

  const handleCheckout = () => {
    if (!user) {
      alert("Please login before checkout");
      navigate("/signin");
      return;
    }
    setCartModalOpen(false);
    navigate("/checkout");
  };

  const handleLogout = () => {
    // Remove user and customerId from localStorage
    localStorage.removeItem(userKey);
    localStorage.removeItem("customerId");

    // Clear cart to prevent accidental order
    localStorage.removeItem(cartKey);
    setCartItems([]);

    setUser(null);
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src="/products/iphone17pro-allcolors.jpg" alt="Logo" className="h-8 w-auto" />
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
              <button type="submit" className="px-4 py-2 bg-sky-600 text-white rounded-r-full hover:bg-sky-700 transition-all">
                Search
              </button>
            </form>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-4">
            {!user ? (
              <>
                <Link to="/signin" className="text-gray-600 hover:text-sky-600">Sign In</Link>
                <Link to="/signup" className="px-3 py-1 bg-sky-600 text-white rounded-full hover:bg-sky-700 transition-all">Sign Up</Link>
              </>
            ) : (
              <>
                <span className="text-gray-700">Hello, {user.name}</span>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all"
                >
                  Logout
                </button>
              </>
            )}

            {/* Cart Button */}
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
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-gray-600 hover:text-sky-600">
              {mobileMenuOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-sm px-4 py-3">
          <Link to="/" className="block py-2 text-gray-600 hover:text-sky-600" onClick={() => setMobileMenuOpen(false)}>Home</Link>
          {!user ? (
            <>
              <Link to="/signin" className="block py-2 text-gray-600 hover:text-sky-600" onClick={() => setMobileMenuOpen(false)}>Sign In</Link>
              <Link to="/signup" className="block py-2 text-gray-600 hover:text-sky-600" onClick={() => setMobileMenuOpen(false)}>Sign Up</Link>
            </>
          ) : (
            <button
              onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
              className="block py-2 text-gray-600 hover:text-sky-600"
            >
              Logout
            </button>
          )}
        </div>
      )}

      {/* Cart Modal */}
      {cartModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-11/12 max-w-md shadow-lg relative">
            <button onClick={() => setCartModalOpen(false)} className="absolute top-3 right-3 text-gray-600 hover:text-sky-600">
              <FiX className="text-xl" />
            </button>
            <h2 className="text-xl font-bold mb-4">Your Cart</h2>
            {cartItems.length > 0 ? (
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {cartItems.map((item, index) => (
                  <div key={index} className="flex justify-between items-center border-b pb-2">
                    <div>
                      <div className="font-semibold">{item.productName}</div>
                      <div className="text-sm text-gray-500">{item.variantName}</div>
                      {item.planId && <div className="text-sm text-green-600">EMI Plan Applied</div>}
                      <div className="text-sm">₹{item.price.toLocaleString()} x {item.quantity}</div>
                    </div>
                    <button
                      onClick={() => {
                        const updatedCart = cartItems.filter(
                          i => !(i.variantId === item.variantId && i.planId === item.planId)
                        );
                        updateCart(updatedCart);
                      }}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p>Your cart is empty</p>
            )}
            <div className="mt-4 flex justify-between">
              <button onClick={handleCheckout} className="px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-all">
                Checkout
              </button>
              <button onClick={() => setCartModalOpen(false)} className="px-4 py-2 bg-gray-300 text-gray-700 rounded-full hover:bg-gray-400 transition-all">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
