"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="back-to-top-wrapper"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-6 right-6 z-50"
        >
          {/* Glow Aura */}
          <motion.div
            className="absolute inset-0 rounded-full blur-2xl"
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.6, 0.2, 0.6],
              backgroundColor: [
                "rgba(16,185,129,0.6)", // emerald
                "rgba(163,230,53,0.6)", // lime
                "rgba(34,211,238,0.6)", // cyan
              ],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "mirror",
            }}
          />

          {/* Main Button */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "mirror",
            }}
            className="relative p-3 rounded-full bg-emerald-600 text-white shadow-lg hover:bg-emerald-700 transition"
          >
            <ArrowUp size={20} />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
