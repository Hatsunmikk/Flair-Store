// src/pages/Home.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/productSlice";
import { addToCart } from "../redux/cartSlice";
import { addToWishlist } from "../redux/wishlistSlice";
import { Link, useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { FaTruck, FaUndo, FaHeadset } from "react-icons/fa";
import Banner from "../components/Banner";
import FAQSection from "../components/FAQSection";
import PrivacyPolicy from "../components/PrivacyPolicy";
import TermsAndConditions from "../components/TermsAndConditions";
import ProductCard from "../components/ProductCard";


export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items, status, error } = useSelector((state) => state.products);
  const search = useSelector((state) => state.search.term);
  const cartItems = useSelector((state) => state.cart.items);
  const wishlistItems = useSelector((state) => state.wishlist);

  const [category, setCategory] = useState("All");
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  // Parallax banner
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, -60]);
  const opacity = useTransform(scrollY, [0, 200], [1, 0.85]);

  const categories = useMemo(() => {
    const set = new Set(items.map((p) => p.category));
    return ["All", ...Array.from(set)];
  }, [items]);

  const filtered = useMemo(() => {
    let list = items;
    if (category !== "All") list = list.filter((p) => p.category === category);
    if (search?.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter((p) => p.title.toLowerCase().includes(q));
    }
    return list;
  }, [items, category, search]);

  const handleCartAction = (product) => {
    const inCart = cartItems.some((item) => item.id === product.id);
    if (inCart) {
      navigate("/cart");
    } else {
      dispatch(addToCart(product));
    }
  };

  const handleWishlistAction = (product) => {
    const inWishlist = wishlistItems.some((item) => item.id === product.id);
    if (inWishlist) {
      navigate("/wishlist");
    } else {
      dispatch(addToWishlist(product));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner */}
      <section className="relative overflow-hidden">
        <Banner />
      </section>

      

      <main className="max-w-7xl mx-auto px-6 py-10" id="products">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Browse Products</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-4 py-2 rounded-full border text-sm ${
                  category === c
                    ? "bg-pink-600 text-white border-pink-600"
                    : "bg-white text-gray-700 border-gray-300 hover:border-pink-400"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Loading / Error */}
        {status === "loading" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-64 bg-white border border-gray-200 rounded-xl animate-pulse" />
            ))}
          </div>
        )}
        {status === "failed" && <p className="text-red-500">{error}</p>}

        {/* Products Grid */}
        {status === "succeeded" && (
          <>
            {filtered.length === 0 ? (
              <p className="text-gray-600">
                No products match your search{category !== "All" ? ` in "${category}"` : ""}.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filtered.map((product, idx) => {
                  const inCart = cartItems.some((i) => i.id === product.id);
                  const inWishlist = wishlistItems.some((i) => i.id === product.id);
                  return (
                    <ProductCard
                      key={product.id}
                      product={product}
                      idx={idx}
                      inCart={inCart}
                      inWishlist={inWishlist}
                      handleCartAction={handleCartAction}
                      handleWishlistAction={handleWishlistAction}
                    />
                  );
                })}
              </div>
            )}
          </>
        )}

        {/* What We Offer */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">What We Offer</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: <FaTruck />, title: "Free Shipping", desc: "Get your products delivered at no extra cost." },
              { icon: <FaUndo />, title: "Free Returns", desc: "Hassle-free returns within 30 days of purchase." },
              { icon: <FaHeadset />, title: "24/7 Support", desc: "Always here to help you with your queries." },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="p-6 bg-white border rounded-xl shadow text-center"
              >
                <div className="text-3xl mb-3 text-pink-600">{item.icon}</div>
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-gray-600 mt-2">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mt-16">
          <FAQSection />
        </section>

        {/* Privacy & T&C */}
        <section className="mt-16 flex gap-4">
          <PrivacyPolicy />
          <TermsAndConditions />
          
        </section>

       
      </main>
    </div>
  );
}
