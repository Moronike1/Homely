// src/components/HowItWorks.tsx
import { motion } from "framer-motion";
import { Home, Search, Phone, Key, ArrowDown } from "lucide-react";

export default function HowItWorks() {
  // Animation settings
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
    }),
  };

  const steps = [
    {
      icon: <Search className="w-10 h-10 text-emerald-600" />,
      title: "Search",
      description: "Browse verified rental, sales, and lease listings.",
    },
    {
      icon: <Home className="w-10 h-10 text-emerald-600" />,
      title: "Compare",
      description: "View prices, features, and property details side by side.",
    },
    {
      icon: <Phone className="w-10 h-10 text-emerald-600" />,
      title: "Connect",
      description: "Directly reach out to landlords or agents securely.",
    },
    {
      icon: <Key className="w-10 h-10 text-emerald-600" />,
      title: "Move In",
      description: "Secure your dream home with confidence and ease.",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Headline */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          How Homely Works
        </h2>
        <p className="text-lg text-gray-600 mb-12">
          Just four simple steps to find your perfect home.
        </p>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              className="bg-white shadow-md rounded-2xl p-6 flex flex-col items-center"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
            >
              {step.icon}
              <h3 className="mt-4 text-xl font-semibold text-gray-800">
                {step.title}
              </h3>
              <p className="mt-2 text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Learn More Button */}
        <motion.a
          href="#testimonials" // target section
          className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white text-lg font-medium rounded-full shadow-lg hover:bg-emerald-700 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Learn More <ArrowDown className="ml-2 w-5 h-5" />
        </motion.a>
      </div>
    </section>
  );
}