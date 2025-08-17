// src/pages/ProductDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../redux/cartSlice";
import { addToWishlist, removeFromWishlist } from "../redux/wishlistSlice";
import { addNotification } from "../redux/notificationSlice"; // ✅ import notifications
import { motion } from "framer-motion";
import { toast } from "react-toastify"; // ✅ assuming you use react-toastify

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const wishlistItems = useSelector((state) => state.wishlist);

  useEffect(() => {
    const fetchProduct = async () => {
      setStatus("loading");
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!res.ok) throw new Error("Failed to fetch product");
        const data = await res.json();
        setProduct(data);
        setStatus("succeeded");
      } catch (err) {
        setError(err.message);
        setStatus("failed");
      }
    };
    fetchProduct();
  }, [id]);

  if (status === "loading") return <p className="p-6 text-gray-500">Loading...</p>;
  if (status === "failed") return <p className="p-6 text-red-500">{error}</p>;
  if (!product) return null;

  const inCart = cartItems.some((item) => item.id === product.id);
  const inWishlist = wishlistItems.some((item) => item.id === product.id);

  const handleCartToggle = () => {
    if (inCart) {
      dispatch(removeFromCart(product.id));
      dispatch(addNotification({
        id: Date.now(),
        type: "cart",
        message: `${product.title} removed from Cart`,
        timestamp: new Date().toISOString()
      }));
      toast.info(`${product.title} removed from Cart`, { position: "bottom-left" });
    } else {
      dispatch(addToCart(product));
      dispatch(addNotification({
        id: Date.now(),
        type: "cart",
        message: `${product.title} added to Cart`,
        timestamp: new Date().toISOString()
      }));
      toast.success(`${product.title} added to Cart`, { position: "bottom-left" });
    }
  };

  const handleWishlistToggle = () => {
    if (inWishlist) {
      dispatch(removeFromWishlist(product.id));
      dispatch(addNotification({
        id: Date.now(),
        type: "wishlist",
        message: `${product.title} removed from Wishlist`,
        timestamp: new Date().toISOString()
      }));
      toast.info(`${product.title} removed from Wishlist`, { position: "bottom-left" });
    } else {
      dispatch(addToWishlist(product));
      dispatch(addNotification({
        id: Date.now(),
        type: "wishlist",
        message: `${product.title} added to Wishlist`,
        timestamp: new Date().toISOString()
      }));
      toast.success(`${product.title} added to Wishlist`, { position: "bottom-left" });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <Link to="/" className="text-pink-600 hover:underline mb-6 inline-block">
        &larr; Back to Home
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-xl shadow p-6 grid md:grid-cols-2 gap-8"
      >
        <div className="flex items-center justify-center">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-96 object-contain"
          />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{product.title}</h2>
          <p className="text-pink-600 font-bold text-xl mt-2">${product.price}</p>
          <p className="mt-4 text-gray-700">{product.description}</p>
          <p className="mt-2 text-gray-600">
            <strong>Category:</strong> {product.category}
          </p>
          {product.rating && (
            <p className="mt-1 text-gray-600">
              <strong>Rating:</strong> {product.rating.rate} ({product.rating.count} reviews)
            </p>
          )}

          <div className="flex flex-wrap gap-4 mt-6">
            <button
              onClick={handleCartToggle}
              className={`px-5 py-2 rounded-lg text-white font-medium transition-colors ${
                inCart ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
              }`}
            >
              {inCart ? "Remove from Cart" : "Add to Cart"}
            </button>
            <button
              onClick={handleWishlistToggle}
              className={`px-5 py-2 rounded-lg text-white font-medium transition-colors ${
                inWishlist ? "bg-red-500 hover:bg-red-600" : "bg-pink-500 hover:bg-pink-600"
              }`}
            >
              {inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
