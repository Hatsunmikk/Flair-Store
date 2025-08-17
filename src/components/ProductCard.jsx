// src/components/ProductCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../redux/cartSlice";
import { addToWishlist, removeFromWishlist } from "../redux/wishlistSlice";
import { addNotification } from "../redux/notificationSlice";
import { motion } from "framer-motion";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const wishlistItems = useSelector((state) => state.wishlist);

  const inCart = cartItems.some((item) => item.id === product.id);
  const inWishlist = wishlistItems.some((item) => item.id === product.id);

  const handleCartToggle = () => {
    if (inCart) {
      dispatch(removeFromCart(product.id));
      dispatch(
        addNotification({
          message: `${product.title} removed from cart`,
          type: "error",
        })
      );
    } else {
      dispatch(addToCart(product));
      dispatch(
        addNotification({
          message: `${product.title} added to cart`,
          type: "success",
        })
      );
    }
  };

  const handleWishlistToggle = () => {
    if (inWishlist) {
      dispatch(removeFromWishlist(product.id));
      dispatch(
        addNotification({
          message: `${product.title} removed from wishlist`,
          type: "error",
        })
      );
    } else {
      dispatch(addToWishlist(product));
      dispatch(
        addNotification({
          message: `${product.title} added to wishlist`,
          type: "success",
        })
      );
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow flex flex-col"
    >
      <Link to={`/product/${product.id}`} className="flex-1 p-4">
        <div className="flex items-center justify-center h-48">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-full object-contain"
          />
        </div>
        <h3 className="mt-4 text-gray-900 font-medium line-clamp-2">
          {product.title}
        </h3>
        <p className="mt-2 text-pink-600 font-bold">${product.price}</p>
        <p className="mt-1 text-sm text-gray-500">{product.category}</p>
      </Link>

      <div className="flex justify-between gap-2 px-4 pb-4">
        <button
          onClick={handleCartToggle}
          className={`flex-1 px-3 py-2 rounded-lg text-white text-sm font-medium transition-colors ${
            inCart ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {inCart ? "Remove from Cart" : "Add to Cart"}
        </button>
        <button
          onClick={handleWishlistToggle}
          className={`flex-1 px-3 py-2 rounded-lg text-white text-sm font-medium transition-colors ${
            inWishlist
              ? "bg-red-500 hover:bg-red-600"
              : "bg-pink-500 hover:bg-pink-600"
          }`}
        >
          {inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
        </button>
      </div>
    </motion.div>
  );
}
