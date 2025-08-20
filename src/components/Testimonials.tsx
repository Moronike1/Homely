// src/components/Testimonials.tsx
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card"; // Assuming you have a Card component

const testimonials = [
  {
    name: "Chinedu Okafor",
    role: "Tenant, Lagos",
    feedback:
      "Finding a rental in Lekki was seamless with Homely. The process was transparent and stress-free.",
  },
  {
    name: "Amina Yusuf",
    role: "Landlord, Abuja",
    feedback:
      "Homely helped me connect with verified tenants quickly. Facility management has also been excellent.",
  },
  {
    name: "Tunde Balogun",
    role: "Property Investor",
    feedback:
      "The lease and sales options gave me confidence in expanding my portfolio. Highly recommend!",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-emerald-700 mb-4"
        >
          Trusted by Renters, Landlords & Investors
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-gray-600 mb-12"
        >
          Here’s what people are saying about their experience with Homely.
        </motion.p>

        {/* Cards */}
        <div className="grid gap-8 md:grid-cols=2 lg:grid-cols-3 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.article
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, boxShadow: "0 12px 30px rgba(0,0,0,0.12)" }}
              whileTap={{ scale: 0.98 }}
              className="rounded-2xl border border-gray-100 bg-white p-6 text-left shadow-sm hover:shadow-md"
            >
              <div className="text-emerald-600 text-4xl leading-none">“</div>
              <p className="mt-3 text-gray-700 italic"> {t.feedback} ”</p>

              <div className="mt-6">
                <h4 className="font-semibold text-gray-900">{t.name}</h4>
                <span className="text-sm text-gray-500">{t.role}</span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}