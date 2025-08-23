import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function TermsAndConditions() {
  const [showTerms, setShowTerms] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowTerms(true)}
        className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-4 py-2 rounded-lg"
      >
        Terms & Conditions
      </button>

      <AnimatePresence>
        {showTerms && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
            data-testid="modal-overlay"   //Added for testing
            onClick={() => setShowTerms(false)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-lg shadow-lg p-6 max-w-md"
            >
              <h3 className="text-lg font-bold mb-2">Terms & Conditions</h3>
              <p className="text-gray-600">
                By using this store, you agree to our terms and conditions. Please read carefully.
              </p>
              <button
                onClick={() => setShowTerms(false)}
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
