// src/components/TestimonialsSection.tsx
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Sarah Johnson",
    text: "Homely made my home search so simple and transparent. I found my perfect apartment within days!",
  },
  {
    name: "David Adewale",
    text: "The facility management service is top-notch. My property has been well-maintained without any stress.",
  },
  {
    name: "Lara Okonkwo",
    text: "Smooth process from inquiry to key handover. Their agents are professional and honest!",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-6 md:px-10 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-12 text-gray-800"
        >
          What Our <span className="text-emerald-600">Clients Say</span>
        </motion.h2>

        <div className="grid gap-10 md:gap-12 md:grid-cols-3">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
            >
              <p className="text-gray-700 italic mb-6">“{t.text}”</p>
              <h4 className="text-emerald-600 font-semibold">{t.name}</h4>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
