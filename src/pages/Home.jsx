// src/pages/Home.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/productSlice";
import { addToCart, removeFromCart } from "../redux/cartSlice";
import { addToWishlist, removeFromWishlist } from "../redux/wishlistSlice";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Home() {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.products);
  const search = useSelector((state) => state.search.term);
  const cartItems = useSelector((state) => state.cart.items);
  const wishlistItems = useSelector((state) => state.wishlist);

  const [category, setCategory] = useState("All");

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  // Parallax values
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

  const handleCartToggle = (product) => {
    const inCart = cartItems.some((item) => item.id === product.id);
    inCart ? dispatch(removeFromCart(product.id)) : dispatch(addToCart(product));
  };

  const handleWishlistToggle = (product) => {
    const inWishlist = wishlistItems.some((item) => item.id === product.id);
    inWishlist ? dispatch(removeFromWishlist(product.id)) : dispatch(addToWishlist(product));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner (parallax-like) */}
      <section className="relative overflow-hidden">
        <motion.div
          style={{ y, opacity }}
          className="relative bg-gradient-to-r from-pink-500 via-fuchsia-500 to-violet-500 text-white"
        >
          <div className="max-w-7xl mx-auto px-6 py-20 sm:py-24">
            <h1 className="text-4xl sm:text-5xl font-extrabold drop-shadow">
              Discover Your Style at Flair Store
            </h1>
            <p className="mt-3 text-white/90 max-w-2xl">
              Shop electronics, fashion, jewelry and more. Curated picks, great prices, fast checkout.
            </p>
            <Link
              to="#products"
              className="inline-block mt-6 bg-white text-pink-600 font-semibold px-6 py-2.5 rounded-full hover:bg-pink-50"
            >
              Shop Now
            </Link>
          </div>
        </motion.div>
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
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.3, delay: (idx % 8) * 0.03 }}
                      className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 flex flex-col text-center hover:shadow-md transition-shadow"
                    >
                      <Link to={`/product/${product.id}`} className="flex-1 flex flex-col">
                        <div className="h-40 flex items-center justify-center mb-4">
                          <img
                            src={product.image}
                            alt={product.title}
                            className="max-h-40 object-contain"
                          />
                        </div>
                        <h3 className="text-sm font-medium text-gray-800 mb-2">
                          {product.title.length > 60
                            ? product.title.slice(0, 60) + "..."
                            : product.title}
                        </h3>
                      </Link>

                      <p className="font-bold text-lg text-gray-900 mb-4">${product.price}</p>

                      <div className="flex gap-3 justify-center">
                        <button
                          onClick={() => handleCartToggle(product)}
                          className={`px-4 py-2 rounded-lg text-white text-sm font-medium transition-colors ${
                            inCart ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
                          }`}
                        >
                          {inCart ? "Remove from Cart" : "Add to Cart"}
                        </button>
                        <button
                          onClick={() => handleWishlistToggle(product)}
                          className={`px-4 py-2 rounded-lg text-white text-sm font-medium transition-colors ${
                            inWishlist ? "bg-red-500 hover:bg-red-600" : "bg-pink-500 hover:bg-pink-600"
                          }`}
                        >
                          {inWishlist ? "Remove" : "Wishlist"}
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
