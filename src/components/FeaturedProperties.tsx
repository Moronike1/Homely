// src/components/FeaturedProperties.tsx

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getProperties } from "../api/propertyService";

export default function FeaturedProperties() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProperties();

      // Pick first 3 and ensure image exists
      const cleaned = data
        .filter((p) => p.image || (p.gallery && p.gallery.length > 0))
        .slice(0, 3);

      setFeatured(cleaned);
    };

    fetchData();
  }, []);

  return (
    <section>
      <div className="max-w-7xl mx-auto px-6 md:px-10">

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800"
        >
          Featured <span className="text-emerald-600">Properties</span>
        </motion.h2>

        {/* Grid */}
        <div className="grid gap-10 md:gap-12 md:grid-cols-2 lg:grid-cols-3">
          {featured.length === 0 && (
            <p className="text-center text-gray-500">No featured properties yet.</p>
          )}

          {featured.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
            >
              <Link to={`/property/${property.id}`}>
                <img
                  src={property.image || property.gallery?.[0]}
                  alt={property.title}
                  className="w-full h-56 object-cover"
                />

                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-gray-800 line-clamp-1">
                    {property.title}
                  </h3>

                  <p className="text-gray-600 mb-2 line-clamp-1">
                    {property.location}
                  </p>

                  <p className="text-emerald-600 font-bold mb-3">
                    ₦{property.price.toLocaleString()}
                  </p>

                  <div className="flex justify-between text-sm text-gray-500">
                    <span>{property.type || "—"}</span>
                    <span>{property.status || "Available"}</span>
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
