// src/pages/Home.tsx
import { motion } from "framer-motion";
import HeroCarousel from "../components/HeroCarousel";
import FeaturedProperties from "../components/FeaturedProperties";
import AboutSection from "../components/AboutSection";
import ServicesSection from "../components/ServicesSection";
import TestimonialsSection from "../components/TestimonialsSection";
import ContactSection from "../components/ContactSection";

export default function Home() {
  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* Hero Section */}
      <section id="hero" className="w-full">
        <HeroCarousel />
      </section>

      {/* Featured Properties */}
      <section id="featured" className="py-16 md:py-20 bg-gray-50">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto px-6 md:px-10"
        >
          <FeaturedProperties />
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 md:py-20 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto px-6 md:px-10"
        >
          <AboutSection />
        </motion.div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 md:py-20 bg-gray-50">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto px-6 md:px-10"
        >
          <ServicesSection />
        </motion.div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 md:py-20 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto px-6 md:px-10"
        >
          <TestimonialsSection />
        </motion.div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-20 bg-gray-50">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto px-6 md:px-10"
        >
          <ContactSection />
        </motion.div>
      </section>
    </div>
  );
}
