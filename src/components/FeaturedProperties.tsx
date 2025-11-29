import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getProperties } from "../api/propertyService";

export default function FeaturedProperties() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const data = await getProperties();
      setFeatured(data.slice(0, 3));
      setLoading(false);
      console.log("FEATURED RAW:", data);
    };
    load();
  }, []);

  console.log("FEATURED FINAL:", featured);


  if (loading) {
    return (
      <section className="text-center py-10">
        <p className="text-gray-500">Loading featured properties...</p>
      </section>
    );
  }

  if (!featured || featured.length === 0) {
    return (
      <section className="text-center py-10">
        <p className="text-gray-500">No featured properties available.</p>
      </section>
    );
  }

  return (
    <section>
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800"
        >
          Featured <span className="text-emerald-600">Properties</span>
        </motion.h2>

        <div className="grid gap-10 md:gap-12 md:grid-cols-2 lg:grid-cols-3">
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
                    <span>{property.type}</span>
                    <span>{property.status}</span>
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
