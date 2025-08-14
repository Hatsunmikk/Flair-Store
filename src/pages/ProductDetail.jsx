import React from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../redux/cartSlice";
import { addToWishlist, removeFromWishlist } from "../redux/wishlistSlice";

export default function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const product = useSelector((state) =>
    state.products.items.find((p) => p.id === parseInt(id))
  );
  const cartItems = useSelector((state) => state.cart.items);
  const wishlistItems = useSelector((state) => state.wishlist);

  if (!product) {
    return <p>Product not found.</p>;
  }

  const inCart = cartItems.some((item) => item.id === product.id);
  const inWishlist = wishlistItems.some((item) => item.id === product.id);

  const handleCartToggle = () => {
    if (inCart) {
      dispatch(removeFromCart(product.id));
    } else {
      dispatch(addToCart(product));
    }
  };

  const handleWishlistToggle = () => {
    if (inWishlist) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>{product.title}</h1>
      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <img
          src={product.image}
          alt={product.title}
          style={{ width: "300px", objectFit: "contain" }}
        />
        <div>
          <p style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
            ${product.price}
          </p>
          <p style={{ marginTop: "10px" }}>{product.description}</p>

          <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
            <button
              onClick={handleCartToggle}
              style={{
                backgroundColor: inCart ? "#f44336" : "#4CAF50",
                color: "white",
                border: "none",
                padding: "10px 15px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              {inCart ? "Remove from Cart" : "Add to Cart"}
            </button>
            <button
              onClick={handleWishlistToggle}
              style={{
                backgroundColor: inWishlist ? "#f44336" : "#FF4081",
                color: "white",
                border: "none",
                padding: "10px 15px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              {inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
