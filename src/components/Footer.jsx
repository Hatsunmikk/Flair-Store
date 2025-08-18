import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addNotification } from "../redux/notificationSlice";
import { toast } from "react-toastify";

export default function Footer() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email.");
      return;
    }

    // ✅ Notification on subscribe
    dispatch(addNotification("Thanks for subscribing"));
    toast.success("Thanks for subscribing");

    setEmail(""); // clear input
  };

  return (
    <footer className="mt-12 bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* Store Info */}
        <div>
          <h3 className="text-lg font-bold text-gray-900">Flair Store</h3>
          <p className="mt-3 text-gray-600">
            Curating quality products across categories. Enjoy free returns, fast delivery, and 24/7 support.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-md font-semibold text-gray-900">Quick Links</h4>
          <ul className="mt-3 space-y-2 text-gray-600">
            <li><Link to="/" className="hover:text-pink-600">Home</Link></li>
            <li><Link to="/wishlist" className="hover:text-pink-600">Wishlist</Link></li>
            <li><Link to="/cart" className="hover:text-pink-600">Cart</Link></li>
            <li><a href="/privacy-policy" className="hover:text-pink-600">Privacy Policy</a></li>
            <li><a href="/terms" className="hover:text-pink-600">Terms & Conditions</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-md font-semibold text-gray-900">Contact</h4>
          <ul className="mt-3 space-y-2 text-gray-600">
            <li>📞 +1 555 123 4567</li>
            <li>✉️ support@flairstore.com</li>
            <li>Mon–Fri, 9:00–18:00</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-md font-semibold text-gray-900">Newsletter</h4>
          <p className="mt-3 text-gray-600">
            Subscribe to get updates on new arrivals and special offers.
          </p>
          <form onSubmit={handleSubscribe} className="mt-4 flex gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-label="Email address"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-pink-600 text-white font-medium hover:bg-pink-700"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-gray-200 py-4 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Flair Store. All rights reserved.
      </div>
    </footer>
  );
}
