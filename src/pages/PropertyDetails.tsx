// src/pages/PropertyDetails.tsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { motion } from "framer-motion";

interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  type: string;
  bedrooms: number;
  bathrooms: number;
  image: string;
  gallery?: string[];
}

const PropertyDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("properties")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;
        setProperty(data);
      } catch (err) {
        console.error("Error fetching property details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  if (loading)
    return <p className="text-center py-20 text-gray-600">Loading...</p>;
  if (!property)
    return <p className="text-center py-20 text-gray-600">Property not found</p>;

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Banner Image */}
      <div
        className="h-[70vh] bg-cover bg-center relative"
        style={{ backgroundImage: `url(${property.image})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {property.title}
          </h1>
          <p className="text-lg">{property.location}</p>
          <p className="text-2xl font-semibold text-emerald-300 mt-2">
            ₦{property.price.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Property Information */}
      <div className="max-w-5xl mx-auto mt-10 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Property Details
          </h2>

          <div className="flex flex-wrap gap-6 text-gray-700">
            <span>📍 Location: {property.location}</span>
            <span>🏠 Type: {property.type}</span>
            <span>🛏️ {property.bedrooms} Bedrooms</span>
            <span>🛁 {property.bathrooms} Bathrooms</span>
          </div>

          <p className="text-gray-700 mt-6 leading-relaxed text-justify">
            {property.description}
          </p>
        </motion.div>

        {/* Gallery Section */}
        {property.gallery && property.gallery.length > 0 && (
          <motion.div
            className="mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-semibold mb-4">Gallery</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {property.gallery.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`Gallery ${i + 1}`}
                  className="w-full h-48 object-cover rounded-lg hover:opacity-90 transition"
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Contact Form */}
        <motion.div
          className="mt-16 bg-white p-8 shadow-lg rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-semibold mb-4 text-gray-800">
            Interested in this property?
          </h3>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your Full Name"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-emerald-500 outline-none"
            />
            <input
              type="email"
              placeholder="Your Email Address"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-emerald-500 outline-none"
            />
            <textarea
              placeholder="Your Message or Inquiry"
              className="w-full border border-gray-300 rounded-lg p-3 h-32 focus:ring-2 focus:ring-emerald-500 outline-none"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition"
            >
              Send Message
            </button>
          </form>
        </motion.div>

        <div className="text-center mt-10">
          <Link
            to="/properties"
            className="text-emerald-600 font-semibold hover:underline"
          >
            ← Back to Properties
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
