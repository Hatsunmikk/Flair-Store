// src/components/Header.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm, clearSearchTerm } from "../redux/searchSlice";
import { FiSearch, FiBell, FiLogIn, FiHeart, FiShoppingCart, FiX } from "react-icons/fi";

export default function Header() {
  const dispatch = useDispatch();
  const cartCount = useSelector((state) => state.cart?.items?.length || 0);
  const wishlistCount = useSelector((state) => Array.isArray(state.wishlist) ? state.wishlist.length : state.wishlist?.items?.length || 0);
  const search = useSelector((state) => state.search.term);

  const [showSearch, setShowSearch] = useState(false);

  const toggleSearch = () => {
    const next = !showSearch;
    setShowSearch(next);
    if (!next) dispatch(clearSearchTerm());
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="text-2xl font-extrabold tracking-tight text-gray-900">
            Flair Store
          </Link>

          {/* Search (toggle) */}
          <div className="flex-1 hidden md:flex items-center justify-center">
            {showSearch ? (
              <div className="w-full max-w-lg relative">
                <input
                  type="text"
                  autoFocus
                  value={search}
                  onChange={(e) => dispatch(setSearchTerm(e.target.value))}
                  placeholder="Search products..."
                  className="w-full rounded-full border border-gray-300 pl-4 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
                <button
                  onClick={toggleSearch}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-gray-700"
                  aria-label="Close search"
                >
                  <FiX />
                </button>
              </div>
            ) : (
              <button
                onClick={toggleSearch}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
                aria-label="Open search"
              >
                <FiSearch className="text-xl" />
                <span className="hidden sm:inline font-medium">Search</span>
              </button>
            )}
          </div>

          {/* Right side icons */}
          <nav className="flex items-center gap-5">
            <Link to="/wishlist" className="relative text-gray-700 hover:text-pink-600 flex items-center gap-1">
              <FiHeart className="text-xl" />
              <span className="hidden sm:inline font-medium">Wishlist</span>
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-pink-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link to="/cart" className="relative text-gray-700 hover:text-gray-900 flex items-center gap-1">
              <FiShoppingCart className="text-xl" />
              <span className="hidden sm:inline font-medium">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            <button className="text-gray-700 hover:text-gray-900" aria-label="Notifications">
              <FiBell className="text-xl" />
            </button>

            <button className="px-3 py-1.5 rounded-full border border-gray-300 text-gray-700 hover:border-pink-500 hover:text-pink-600">
              <span className="inline-flex items-center gap-2">
                <FiLogIn /> Login
              </span>
            </button>
          </nav>
        </div>

        {/* Mobile search bar */}
        <div className="md:hidden pb-3">
          {showSearch ? (
            <div className="relative">
              <input
                type="text"
                autoFocus
                value={search}
                onChange={(e) => dispatch(setSearchTerm(e.target.value))}
                placeholder="Search products..."
                className="w-full rounded-full border border-gray-300 pl-4 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <button
                onClick={toggleSearch}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-gray-700"
                aria-label="Close search"
              >
                <FiX />
              </button>
            </div>
          ) : (
            <button
              onClick={toggleSearch}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
              aria-label="Open search"
            >
              <FiSearch className="text-xl" />
              <span className="font-medium">Search</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
