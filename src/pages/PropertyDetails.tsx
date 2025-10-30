// src/pages/PropertyDetails.tsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

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

const PropertyDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `http://localhost:5000/api/properties/${id}`
        );
        setProperty(data);
      } catch (error) {
        console.error("Error fetching property:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProperty();
  }, [id]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (!property) return <p className="p-6">Property not found</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <img
        src={property.image}
        alt={property.title}
        className="w-full h-96 object-cover rounded-lg mb-6"
      />

      <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
      <p className="text-gray-600 mb-4">{property.location}</p>
      <p className="text-blue-600 font-bold text-xl mb-4">
        ₦{property.price.toLocaleString()}
      </p>

      <div className="flex gap-4 text-gray-700 mb-6">
        <span>{property.bedrooms} Bedrooms</span>
        <span>{property.bathrooms} Bathrooms</span>
        <span className="capitalize">{property.type}</span>
      </div>

      <p className="text-gray-800 leading-relaxed mb-8">
        {property.description}
      </p>

      <Link
        to="/properties"
        className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800"
      >
        Back to Listings
      </Link>
    </div>
  );
};

export default PropertyDetails;
