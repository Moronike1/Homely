// src/components/FeaturesGrid.tsx
import { motion } from "framer-motion";

export default function FeaturesGrid() {
  const features = [
    {
      title: "Verified Listings",
      description: "All properties are vetted for authenticity and security.",
      icon: "🏠",
    },
    {
      title: "Flexible Payments",
      description: "Pay rent, sales, or leases conveniently and securely.",
      icon: "💳",
    },
    {
      title: "Property Management",
      description: "Easily manage facilities and tenants in one place.",
      icon: "⚙️",
    },
    {
      title: "Nationwide Coverage",
      description: "Discover options across major cities in Nigeria.",
      icon: "🌍",
    },
  ];

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2
          className="text-3xl font-bold text-center text-emerald-800 mb-12"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Why Choose Homely?
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-emerald-100 text-emerald-700 mb-4 text-2xl">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-emerald-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}