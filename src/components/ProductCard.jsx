// src/components/ProductCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function ProductCard({
  product,
  idx,
  inCart,
  inWishlist,
  handleCartAction,
  handleWishlistAction,
}) {
  return (
    <motion.div
      key={product.id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.3, delay: (idx % 8) * 0.03 }}
      className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 flex flex-col text-center hover:shadow-md transition-shadow"
    >
      <Link to={`/product/${product.id}`} className="flex-1 flex flex-col">
        <div className="h-40 flex items-center justify-center mb-4">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-40 object-contain"
          />
        </div>
        <h3 className="text-sm font-medium text-gray-800 mb-2">
          {product.title.length > 60
            ? product.title.slice(0, 60) + "..."
            : product.title}
        </h3>
      </Link>

      <p className="font-bold text-lg text-gray-900 mb-4">
        ${product.price}
      </p>

      <div className="flex gap-3 justify-center">
        <button
          onClick={() => handleCartAction(product)}
          className={`px-4 py-2 rounded-lg text-white text-sm font-medium transition-colors ${
            inCart
              ? "bg-green-500 hover:bg-green-600"
              : "bg-pink-500 hover:bg-pink-600"
          }`}
        >
          {inCart ? "Go to Cart" : "Add to Cart"}
        </button>
        <button
          onClick={() => handleWishlistAction(product)}
          className={`px-4 py-2 rounded-lg text-white text-sm font-medium transition-colors ${
            inWishlist
              ? "bg-green-500 hover:bg-green-600"
              : "bg-pink-500 hover:bg-pink-600"
          }`}
        >
          {inWishlist ? "Go to Wishlist" : "Add to Wishlist"}
        </button>
      </div>
    </motion.div>
  );
}
