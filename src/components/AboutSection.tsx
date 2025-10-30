// src/components/AboutSection.tsx
import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
        >
          {/* Left: Text */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Built for people who want a home — not just a listing
            </h2>

            <p className="text-gray-600 mb-6 leading-relaxed">
              Homely connects renters, buyers and landlords with verified
              listings across Nigeria. We combine trusted property data,
              transparent pricing and an easy-to-use interface so finding or
              managing a home becomes simple and stress-free.
            </p>

            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="inline-block bg-emerald-600 text-white rounded-full p-2">
                  ✓
                </span>
                <div>
                  <div className="font-medium text-gray-900">Verified listings</div>
                  <div className="text-sm text-gray-600">Every property is checked for authenticity.</div>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="inline-block bg-emerald-600 text-white rounded-full p-2">
                  ✓
                </span>
                <div>
                  <div className="font-medium text-gray-900">Facility management</div>
                  <div className="text-sm text-gray-600">Submit and track maintenance requests with ease.</div>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="inline-block bg-emerald-600 text-white rounded-full p-2">
                  ✓
                </span>
                <div>
                  <div className="font-medium text-gray-900">Transparent pricing</div>
                  <div className="text-sm text-gray-600">Clear fees and property details so you can decide fast.</div>
                </div>
              </li>
            </ul>
          </div>

          {/* Right: Visual / stats */}
          <div className="space-y-6">
            <div className="rounded-2xl overflow-hidden shadow-md">
              <img
                src="../public/images/Roundtable discussion.png"
                alt="people sitting around the desk discussing"
                className="w-full h-64 object-cover"
                onError={(e) => {
                  const t = e.target as HTMLImageElement;
                  t.onerror = null;
                  t.src = "https://via.placeholder.com/1400x900?text=Homely+Home";
                }}
              />
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-gray-50 p-4 rounded-xl">
                <div className="text-2xl font-bold text-emerald-600">1.2k+</div>
                <div className="text-xs text-gray-500">Verified listings</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl">
                <div className="text-2xl font-bold text-emerald-600">4.9/5</div>
                <div className="text-xs text-gray-500">Average rating</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl">
                <div className="text-2xl font-bold text-emerald-600">24/7</div>
                <div className="text-xs text-gray-500">Support</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
