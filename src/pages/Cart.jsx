// src/pages/Cart.jsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} from "../redux/cartSlice";
import { Link } from "react-router-dom";

export default function Cart() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>Your Cart is Empty</h2>
        <Link to="/">Go back to Home</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Your Cart</h2>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          marginTop: "20px",
        }}
      >
        {cartItems.map((item) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              alignItems: "center",
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "10px",
              gap: "15px",
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
                <button
                  onClick={() => dispatch(decreaseQuantity(item.id))}
                  style={{ padding: "5px 10px" }}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => dispatch(increaseQuantity(item.id))}
                  style={{ padding: "5px 10px" }}
                >
                  +
                </button>
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
          </div>
        ))}
      </div>
      <h3 style={{ marginTop: "20px" }}>Total: ${totalPrice.toFixed(2)}</h3>
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
