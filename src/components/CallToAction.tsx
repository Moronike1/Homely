// src/components/CallToAction.tsx
import { motion } from "framer-motion";

export default function CallToAction() {
  return (
    <section className="relative bg-emerald-700 py-20 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-6"
        >
          Ready to Find Your Next Home?
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-lg text-emerald-100 mb-10"
        >
          Join thousands of renters, landlords, and investors using Homely to
          rent, buy, lease, or manage properties with confidence.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <a
            href="#"
            className="px-6 py-3 rounded-xl bg-white text-emerald-700 font-semibold shadow hover:scale-105 transition"
          >
            Get Started
          </a>
          <a
            href="#"
            className="px-6 py-3 rounded-xl bg-emerald-600 border border-emerald-300 text-white font-semibold hover:bg-emerald-800 hover:scale-105 transition"
          >
            Learn More
          </a>
        </motion.div>
      </div>
    </section>
  );
}
