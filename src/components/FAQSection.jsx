// src/components/FaqSection.jsx
import React from "react";
import { motion } from "framer-motion";

export default function FaqSection() {
  const faqs = [
    { q: "What is your return policy?", a: "We offer free returns within 30 days of purchase." },
    { q: "Do you offer free shipping?", a: "Yes, we provide free shipping on all products." },
    { q: "How can I contact support?", a: "You can reach us 24/7 via chat, email, or phone." },
  ];

  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Frequently Asked Questions
      </h2>
      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <motion.div
            key={i}
            initial={false}
            className="bg-white border rounded-lg shadow"
          >
            <details className="p-4">
              <summary className="cursor-pointer font-medium text-gray-800">
                {faq.q}
              </summary>
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3 }}
                className="text-gray-600 mt-2"
              >
                {faq.a}
              </motion.p>
            </details>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
