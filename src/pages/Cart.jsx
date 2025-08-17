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

export default function Cart() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          Your Cart is Empty
        </motion.h2>
        <Link to="/" style={{ color: "#FF4081" }}>Go back to Home</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        Your Cart
      </motion.h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "15px", marginTop: "20px" }}>
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
                <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                  <button onClick={() => dispatch(decreaseQuantity(item.id))}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => dispatch(increaseQuantity(item.id))}>+</button>
                </div>
              </div>
              <button
                onClick={() => dispatch(removeFromCart(item.id))}
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
        onClick={() => dispatch(clearCart())}
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
