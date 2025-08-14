import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../redux/cartSlice";
import { addToWishlist, removeFromWishlist } from "../redux/wishlistSlice";

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

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p style={{ color: "red" }}>{error}</p>;
  if (!product) return null;

  const inCart = cartItems.some((item) => item.id === product.id);
  const inWishlist = wishlistItems.some((item) => item.id === product.id);

  const handleCartToggle = () => {
    if (inCart) dispatch(removeFromCart(product.id));
    else dispatch(addToCart(product));
  };

  const handleWishlistToggle = () => {
    if (inWishlist) dispatch(removeFromWishlist(product.id));
    else dispatch(addToWishlist(product));
  };

  return (
    <div style={{ padding: "20px" }}>
      <Link to="/" style={{ marginBottom: "20px", display: "inline-block" }}>
        &larr; Back to Home
      </Link>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        <img
          src={product.image}
          alt={product.title}
          style={{ maxWidth: "300px", objectFit: "contain" }}
        />

        <div style={{ flex: 1, minWidth: "250px" }}>
          <h2>{product.title}</h2>
          <p style={{ fontWeight: "bold", fontSize: "1.5rem" }}>${product.price}</p>
          <p>{product.description}</p>
          <p><strong>Category:</strong> {product.category}</p>
          {product.rating && (
            <p>
              <strong>Rating:</strong> {product.rating.rate} ({product.rating.count} reviews)
            </p>
          )}

          <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
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
