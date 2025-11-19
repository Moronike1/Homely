// src/components/ServicesSection.tsx
import { motion } from "framer-motion";
import { Home, Key, Wrench, ClipboardCheck } from "lucide-react";

const services = [
  {
    icon: <Home className="w-10 h-10 text-emerald-600" />,
    title: "Property Sales",
    description:
      "Buy your dream home from verified listings with full documentation and trusted agents.",
  },
  {
    icon: <Key className="w-10 h-10 text-emerald-600" />,
    title: "Property Rentals",
    description:
      "Find apartments and houses for rent easily with transparent pricing and reliable landlords.",
  },
  {
    icon: <Wrench className="w-10 h-10 text-emerald-600" />,
    title: "Facility Management",
    description:
      "We provide maintenance, repairs, and professional property management services for your comfort.",
  },
  {
    icon: <ClipboardCheck className="w-10 h-10 text-emerald-600" />,
    title: "Lease Advisory",
    description:
      "Our experts guide you through lease agreements and help you get the best property deals.",
  },
];

export default function ServicesSection() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-6 md:px-10 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-12 text-gray-800"
        >
          Our <span className="text-emerald-600">Core Services</span>
        </motion.h2>

        <div className="grid gap-10 md:gap-12 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-50 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow text-center"
            >
              <div className="flex justify-center mb-6">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
