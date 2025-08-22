import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PrivacyPolicy() {
  const [showPrivacy, setShowPrivacy] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowPrivacy(true)}
        className="text-sm text-gray-500 hover:underline"
      >
        Privacy Policy
      </button>

      <AnimatePresence>
        {showPrivacy && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
            onClick={() => setShowPrivacy(false)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-lg shadow-lg p-6 max-w-md"
            >
              <h3 className="text-lg font-bold mb-2">Privacy Policy</h3>
              <p className="text-gray-600">
                We respect your privacy and ensure your personal data is secure with us.
              </p>
              <button
                aria-label="Close Privacy Policy"   // ✅ Added accessibility
                onClick={() => setShowPrivacy(false)}
                className="mt-4 px-3 py-2 bg-gray-200 rounded"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
