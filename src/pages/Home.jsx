import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/productSlice";
import { addToCart, removeFromCart } from "../redux/cartSlice";
import { addToWishlist, removeFromWishlist } from "../redux/wishlistSlice";

export default function Home() {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.products);
  const cartItems = useSelector((state) => state.cart.items);
  const wishlistItems = useSelector((state) => state.wishlist);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  const handleCartToggle = (product) => {
    const inCart = cartItems.some((item) => item.id === product.id);
    if (inCart) {
      dispatch(removeFromCart(product.id));
    } else {
      dispatch(addToCart(product));
    }
  };

  const handleWishlistToggle = (product) => {
    const inWishlist = wishlistItems.some((item) => item.id === product.id);
    if (inWishlist) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  return (
    <div className="home-container" style={{ padding: "20px" }}>
      <h1 style={{ marginBottom: "20px" }}>Products</h1>

      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p style={{ color: "red" }}>{error}</p>}

      {status === "succeeded" && (
        <div
          className="product-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px",
          }}
        >
          {items.map((product) => {
            const inCart = cartItems.some((item) => item.id === product.id);
            const inWishlist = wishlistItems.some((item) => item.id === product.id);

            return (
              <div
                key={product.id}
                className="product-card"
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "15px",
                  textAlign: "center",
                }}
              >
                <img
                  src={product.image}
                  alt={product.title}
                  style={{
                    height: "150px",
                    objectFit: "contain",
                    marginBottom: "10px",
                  }}
                />
                <h3 style={{ fontSize: "1rem", marginBottom: "10px" }}>
                  {product.title.length > 40
                    ? product.title.slice(0, 40) + "..."
                    : product.title}
                </h3>
                <p style={{ fontWeight: "bold", marginBottom: "10px" }}>
                  ${product.price}
                </p>
                <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
                  <button
                    onClick={() => handleCartToggle(product)}
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
                    onClick={() => handleWishlistToggle(product)}
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
            );
          })}
        </div>
      )}
    </div>
  );
}
