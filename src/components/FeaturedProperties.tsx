// src/components/FeaturedProperties.tsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const properties = [
  {
    id: "1",
    title: "Luxury Apartment in Lekki Phase 1",
    price: 85000000,
    location: "Lekki, Lagos",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80",
    bedrooms: 4,
    bathrooms: 3,
  },
  {
    id: "2",
    title: "Modern Duplex in Ikoyi",
    price: 120000000,
    location: "Ikoyi, Lagos",
    image:
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1920&q=80",
    bedrooms: 5,
    bathrooms: 4,
  },
  {
    id: "3",
    title: "Affordable Mini Flat in Yaba",
    price: 25000000,
    location: "Yaba, Lagos",
    image:
      "./public/images/miniflat.jpg",
    bedrooms: 2,
    bathrooms: 1,
  },
];

export default function FeaturedProperties() {
  return (
    <section>
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800"
        >
          Featured <span className="text-emerald-600">Properties</span>
        </motion.h2>

        {/* Property Grid */}
        <div className="grid gap-10 md:gap-12 md:grid-cols-2 lg:grid-cols-3">
          {properties.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
            >
              <Link to={`/properties/${property.id}`}>
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-56 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">
                    {property.title}
                  </h3>
                  <p className="text-gray-600 mb-2">{property.location}</p>
                  <p className="text-emerald-600 font-bold mb-3">
                    ₦{property.price.toLocaleString()}
                  </p>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>{property.bedrooms} Bedrooms</span>
                    <span>{property.bathrooms} Bathrooms</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
