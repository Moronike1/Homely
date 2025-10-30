// src/components/ContactSection.tsx
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactSection() {
  return (
    <section id="contact" className="bg-gray-900 text-white py-16">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
        {/* Left - Text content */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-4 text-emerald-400">
            Let’s Connect
          </h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            Have questions about property listings, management, or partnerships?
            We’d love to hear from you. Reach out to us anytime — your next home
            or investment opportunity awaits.
          </p>

          <div className="space-y-4 text-gray-300">
            <p className="flex items-center gap-3">
              <Mail className="text-emerald-400" /> info@homely.ng
            </p>
            <p className="flex items-center gap-3">
              <Phone className="text-emerald-400" /> +234 812 345 6789
            </p>
            <p className="flex items-center gap-3">
              <MapPin className="text-emerald-400" /> 42 Admiralty Way, Lekki
              Phase 1, Lagos
            </p>
          </div>
        </motion.div>

        {/* Right - Contact form */}
        <motion.form
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="bg-gray-800 p-8 rounded-2xl shadow-lg"
        >
          <h3 className="text-2xl font-semibold mb-6 text-emerald-400">
            Send Us a Message
          </h3>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-emerald-500"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-emerald-500"
            />
            <textarea
              placeholder="Your Message"
              rows={5}
              className="w-full p-3 rounded-md bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-emerald-500"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 transition text-white font-semibold py-3 rounded-md"
            >
              Send Message
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
