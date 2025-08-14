import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/productSlice";

export default function Home() {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

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
          {items.map((product) => (
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
                style={{ height: "150px", objectFit: "contain", marginBottom: "10px" }}
              />
              <h3 style={{ fontSize: "1rem", marginBottom: "10px" }}>
                {product.title.length > 40
                  ? product.title.slice(0, 40) + "..."
                  : product.title}
              </h3>
              <p style={{ fontWeight: "bold", marginBottom: "10px" }}>
                ${product.price}
              </p>
              <button
                style={{
                  backgroundColor: "#4CAF50",
                  color: "white",
                  border: "none",
                  padding: "10px 15px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
