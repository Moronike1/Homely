import heroImage from "../assets/hero image.jpg"; // change this to your actual image path
import Hero from "../components/HeroCarousel"; // Assuming you have a Hero component for the hero section

export default function Home() {
  return (

  
    <div id="features" className=" scroll-mt-20 pt-8 px-6 py-12 bg white">
      <Hero />
      {/* Hero Section */}
      <section id="services" className="relative w-full h-[500px] bg-gray-100">
      <div
        className="h-[80vh] bg-cover bg-center relative flex items-center justify-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Find Your Next Home with <span className="text-blue-300">Homely</span>
          </h1>
          <p className="text-lg md:text-2xl text-white mb-6">
            Discover rental, sales, and lease options across Nigeria.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/rent" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition">
              Explore Rentals
            </a>
            <a href="/sales" className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition">
              Browse Properties
            </a>
            <a href="/lease" className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg transition">
              Lease Space
            </a>
            <a href="/facility-management" className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition">
              Manage Facilities
            </a>
          </div>
        </div>
      </div>
      </section>

      {/* Optional Extra Section Below */}
      <div className="text-center py-12 px-4 bg-white">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Why Choose Homely?</h2>
        <p className="max-w-2xl mx-auto text-gray-600 text-lg">
          We provide seamless access to verified property listings for rent, sale, or lease. Our platform ensures transparency, security, and real-time management support.
        </p>
      </div>
    </div>
  );
}