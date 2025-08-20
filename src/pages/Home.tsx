import heroImage from "../assets/hero image.jpg"; // change this to your actual image path
import Hero from "../components/HeroCarousel"; // Assuming you have a Hero component for the hero section
import FeaturesGrid from "../components/FeaturesGrid"; // Assuming you have a FeaturesGrid component for the 
// features section
import HowItWorks from "../components/HowItWorks"; // Importing the HowItWorks component
import Testimonials from "../components/Testimonials"; // Importing the Testimonials component
import CallToAction from "../components/CallToAction"; // Importing the CallToAction component
import { motion } from "framer-motion"; // Importing motion for animations

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren:0.5, }, },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 , transition: { duration: 0.6 } },
};



export default function Home() {
  return (

  
    <div className=" scroll-mt-20 pt-8 px-6 py-12 bg white">
      <Hero />
      {/* Hero Section */}

      {/* Static Hero Section */}
      <section id="hero-section" className="py-16 text-center">
      <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
        className="h-[80vh] bg-cover bg-center relative flex items-center justify-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50">
        <div className="relative z-10 text-center px-4">
          <motion.h1
          variants={item} className="text-4xl md:text-6xl font-bold text-white mb-4">
            Find Your Next Home with <span className="text-blue-300">Homely</span>
          </motion.h1>
          <motion.p variants={item} className="text-lg md:text-2xl text-white mb-6">
            Discover rental, sales, and lease options across Nigeria.
          </motion.p>
          {/* Stagger container */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            viewport={{ once: true }}
          >
          <div className="flex flex-wrap justify-center gap-4">
            <motion.a 
            variants={item}
            href="#rentals" 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg transition">
              Explore Rentals
            </motion.a>
            <motion.a 
            variants={item}
            href="#sales" 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg transition">
              Browse Properties
            </motion.a>
            <motion.a 
             variants={item}
            href="#lease" 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg transition">
              Lease Space
            </motion.a>
            <motion.a 
             variants={item}
            href="#facilities" 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg transition">
              Manage Facilities
            </motion.a>
          </div>
          </motion.div>
        </div>
      </div>
      </motion.div>
      </section>

      <section id="features" className="py-16 bg-emerald-50 scroll-mt-20">
  <div className="max-w-6xl mx-auto px-6 text-center">
    <h2 className="text-3xl font-bold mb-10">Explore What Homely Offers</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      
      {/* Rentals */}
      <div id="rentals" className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
        <div className="text-indigo-600 mb-4 text-4xl">🏠</div>
        <h3 className="font-semibold text-lg mb-2">Rentals</h3>
        <p className="text-emerald-600">Find affordable rental homes across Nigeria tailored to your needs.</p>
      </div>

      {/* Sales */}
      <div id="sales" className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
        <div className="text-emerald-600 mb-4 text-4xl">🔑</div>
        <h3 className="font-semibold text-lg mb-2">Sales</h3>
        <p className="text-emerald-600">Browse properties for sale and make your dream of home ownership a reality.</p>
      </div>

      {/* Lease */}
      <div id="lease" className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
        <div className="text-emerald-600 mb-4 text-4xl">📜</div>
        <h3 className="font-semibold text-lg mb-2">Lease Options</h3>
        <p className="text-emerald-600">Discover flexible lease options for residential and commercial properties.</p>
      </div>

      {/* Facilities */}
      <div id="facilities" className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
        <div className="text-emerald-600 mb-4 text-4xl">🛠️</div>
        <h3 className="font-semibold text-lg mb-2">Facility Management</h3>
        <p className="text-emerald-600">Easily manage property facilities, services, and maintenance requests.</p>
      </div>
    </div>
  </div>
</section>

{/* Call to Action Section */}
<section className="py-8 bg-emerald-800 text-white text-center">
  <h2 className="text-3xl md:text-4xl font-bold mb-6">
    Ready to Find Your Next Home?
  </h2>
  <p className="max-w-2xl mx-auto mb-8 text-lg">
    Join Homely today and explore verified rental, sales, lease, and facility management options across Nigeria.
  </p>
  <a 
    href="#hero-section" 
    className="px-8 py-4 bg-white text-emerald-800 font-semibold rounded-xl shadow hover:bg-gray-100 transition"
  >
    Get Started
  </a>
</section>


      {/* Optional Extra Section Below */}
      <section className="text-center py-12 px-4 bg-white">
       

        <FeaturesGrid />
      {/* Features Section */}
    </section>
     
       <HowItWorks />
     {/* How It Works Section */}

     < Testimonials />
      {/* Testimonials Section */}

      <CallToAction />
    </div>

    
  );
}