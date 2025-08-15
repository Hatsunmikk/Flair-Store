import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const cartCount = useSelector((state) => state.cart?.items?.length || 0);
  const wishlistCount = useSelector((state) => state.wishlist?.items?.length || 0);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4 py-3">
        {/* Store Name */}
        <Link
          to="/"
          className="text-2xl font-bold text-gray-800 hover:text-pink-500 transition-colors"
        >
          Flair Store
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-6">
          <Link
            to="/wishlist"
            className="relative text-gray-600 hover:text-pink-500 transition-colors"
          >
            Wishlist
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-pink-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </Link>
          <Link
            to="/cart"
            className="relative text-gray-600 hover:text-pink-500 transition-colors"
          >
            Cart
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-pink-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
