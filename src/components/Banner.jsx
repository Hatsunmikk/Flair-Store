// src/components/Banner.jsx
import React from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Banner() {
  // replicate the scroll + opacity effect from Home.jsx
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, 100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
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
  );
}
