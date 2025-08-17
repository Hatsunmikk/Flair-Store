import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} from "../redux/cartSlice";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { addNotification } from "../redux/notificationSlice";

export default function Cart() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleRemove = (id, title) => {
    dispatch(removeFromCart(id));
    const message = `Removed ${title} from cart.`;
    dispatch(addNotification(message));
    toast.info(message);
  };

  const handleIncrease = (id, title) => {
    dispatch(increaseQuantity(id));
    const message = `Increased quantity of ${title}.`;
    dispatch(addNotification(message));
    toast.success(message);
  };

  const handleDecrease = (id, title) => {
    dispatch(decreaseQuantity(id));
    const message = `Decreased quantity of ${title}.`;
    dispatch(addNotification(message));
    toast.info(message);
  };

  const handleClear = () => {
    dispatch(clearCart());
    const message = "Cleared cart.";
    dispatch(addNotification(message));
    toast.warn(message);
  };

  if (cartItems.length === 0) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          Your Cart is Empty
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
        Your Cart
      </motion.h2>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          marginTop: "20px",
        }}
      >
        <AnimatePresence>
          {cartItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.3 }}
              style={{
                display: "flex",
                alignItems: "center",
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "10px",
                gap: "15px",
                background: "white",
              }}
            >
              <img
                src={item.image}
                alt={item.title}
                style={{ width: "80px", height: "80px", objectFit: "contain" }}
              />
              <div style={{ flex: 1 }}>
                <h4>{item.title}</h4>
                <p>${item.price}</p>
                <div
                  style={{ display: "flex", gap: "10px", alignItems: "center" }}
                >
                  <button onClick={() => handleDecrease(item.id, item.title)}>
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleIncrease(item.id, item.title)}>
                    +
                  </button>
                </div>
              </div>
              <button
                onClick={() => handleRemove(item.id, item.title)}
                style={{
                  backgroundColor: "#f44336",
                  color: "white",
                  border: "none",
                  padding: "8px 12px",
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
      <motion.h3
        style={{ marginTop: "20px" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Total: ${totalPrice.toFixed(2)}
      </motion.h3>
      <button
        onClick={handleClear}
        style={{
          marginTop: "10px",
          backgroundColor: "#FF4081",
          color: "white",
          border: "none",
          padding: "10px 15px",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Clear Cart
      </button>
    </div>
  );
}
