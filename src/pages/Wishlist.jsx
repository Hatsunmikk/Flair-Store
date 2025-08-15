// src/pages/Wishlist.jsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "../redux/wishlistSlice";
import { Link } from "react-router-dom";

export default function Wishlist() {
  const wishlistItems = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    dispatch(removeFromWishlist(id));
  };

  if (wishlistItems.length === 0)
    return (
      <div style={{ padding: "20px" }}>
        <h2>Your Wishlist is empty</h2>
        <Link to="/">Go back to Home</Link>
      </div>
    );

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Wishlist</h2>
      <Link to="/" style={{ display: "inline-block", marginBottom: "20px" }}>
        &larr; Back to Home
      </Link>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
        }}
      >
        {wishlistItems.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "15px",
              textAlign: "center",
            }}
          >
            <Link to={`/product/${product.id}`}>
              <img
                src={product.image}
                alt={product.title}
                style={{ height: "150px", objectFit: "contain", marginBottom: "10px" }}
              />
              <h3>
                {product.title.length > 40
                  ? product.title.slice(0, 40) + "..."
                  : product.title}
              </h3>
            </Link>
            <p style={{ fontWeight: "bold" }}>${product.price}</p>
            <button
              onClick={() => handleRemove(product.id)}
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
          </div>
        ))}
      </div>
    </div>
  );
}
