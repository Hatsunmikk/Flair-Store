// src/App.jsx
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Login from "./pages/Login";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function App() {
  const [cartItems, setCartItems] = useState(() => {
    return JSON.parse(localStorage.getItem("cartItems")) || [];
  });

  const [wishlistItems, setWishlistItems] = useState(() => {
    return JSON.parse(localStorage.getItem("wishlistItems")) || [];
  });

  // Persist to localStorage when cart or wishlist changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  return (
    <Router>
      <Header
        cartCount={cartItems.length}
        wishlistCount={wishlistItems.length}
      />
      <AnimatePresence mode="wait">
        <Routes>
          <Route
            path="/"
            element={<Home setCartItems={setCartItems} setWishlistItems={setWishlistItems} />}
          />
          <Route
            path="/product/:id"
            element={
              <ProductDetails
                setCartItems={setCartItems}
                setWishlistItems={setWishlistItems}
              />
            }
          />
          <Route
            path="/cart"
            element={<Cart cartItems={cartItems} setCartItems={setCartItems} />}
          />
          <Route
            path="/wishlist"
            element={
              <Wishlist
                wishlistItems={wishlistItems}
                setWishlistItems={setWishlistItems}
              />
            }
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </Router>
  );
}
