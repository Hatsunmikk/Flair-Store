import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "../redux/wishlistSlice";
import { addToCart } from "../redux/cartSlice";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { addNotification } from "../redux/notificationSlice";

export default function Wishlist() {
  const wishlistItems = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  const handleRemove = (id, title) => {
    dispatch(removeFromWishlist(id));
    const message = `Removed ${title} from wishlist.`;
    dispatch(addNotification(message));
    toast.info(message);
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    dispatch(removeFromWishlist(product.id));
    const message = `Moved ${product.title} to cart.`;
    dispatch(addNotification(message));
    toast.success(message);
  };

  if (wishlistItems.length === 0) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          Your Wishlist is empty
        </motion.h2>
        <Link to="/" style={{ color: "#FF4081" }}>
          Go back to Home
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        My Wishlist
      </motion.h2>
      <Link
        to="/"
        style={{
          display: "inline-block",
          marginBottom: "20px",
          color: "#FF4081",
        }}
      >
        &larr; Back to Home
      </Link>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
        }}
      >
        <AnimatePresence>
          {wishlistItems.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "15px",
                textAlign: "center",
                background: "white",
              }}
            >
              <Link to={`/product/${product.id}`}>
                <img
                  src={product.image}
                  alt={product.title}
                  style={{
                    height: "150px",
                    objectFit: "contain",
                    marginBottom: "10px",
                  }}
                />
                <h3>
                  {product.title.length > 40
                    ? product.title.slice(0, 40) + "..."
                    : product.title}
                </h3>
              </Link>
              <p style={{ fontWeight: "bold" }}>${product.price}</p>

              {/* Add to Cart button */}
              <button
                onClick={() => handleAddToCart(product)}
                style={{
                  backgroundColor: "#4CAF50",
                  color: "white",
                  border: "none",
                  padding: "10px 15px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  marginRight: "10px",
                }}
              >
                Add to Cart
              </button>

              {/* Remove button */}
              <button
                onClick={() => handleRemove(product.id, product.title)}
                style={{
                  backgroundColor: "#f44336",
                  color: "white",
                  border: "none",
                  padding: "10px 15px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Remove
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
