// src/pages/Properties.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

interface Property {
  _id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  type: string;
  bedrooms: number;
  bathrooms: number;
  image: string;
}

const Properties: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("http://localhost:5000/api/properties");
        setProperties(data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) {
    return <p className="text-center py-10 text-gray-600">Loading properties...</p>;
  }

  return (
    <div className="w-full bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">
          Explore Our Properties
        </h2>

        {properties.length === 0 ? (
          <p className="text-center text-gray-500">
            No properties available at the moment.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <div
                key={property._id}
                className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <img
                  src={property.image}
                  alt={property.title}
                  className="h-56 w-full object-cover"
                />
                <div className="p-5">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-1">
                    {property.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {property.description}
                  </p>
                  <p className="text-blue-600 font-semibold mb-2">
                    ₦{property.price.toLocaleString()}
                  </p>
                  <p className="text-gray-500 text-sm mb-4">
                    {property.location} • {property.bedrooms} Beds • {property.bathrooms} Baths
                  </p>
                  <Link
                    to={`/properties/${property._id}`}
                    className="block text-center bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Properties;
