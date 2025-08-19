import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TermsAndConditions = () => {
  const [showTerms, setShowTerms] = useState(false);

  return (
    <>
      {/* Button */}
      <button
        onClick={() => setShowTerms(true)}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        Terms & Conditions
      </button>

      {/* Modal */}
      <AnimatePresence>
        {showTerms && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
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
                By using our website, you agree to abide by our company policies and guidelines.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TermsAndConditions;
