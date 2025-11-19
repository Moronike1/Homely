// src/pages/Properties.tsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

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
  created_at?: string;
}

const Properties: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>("newest");

  // 🧠 Fetch properties with filtering, search, and sorting
  const fetchProperties = async (type?: string, search?: string) => {
    setLoading(true);
    try {
      let query = supabase.from("properties").select("*");

      if (type && type !== "all") {
        query = query.eq("type", type);
      }

      if (search && search.trim() !== "") {
        query = query.or(
          `title.ilike.%${search}%,description.ilike.%${search}%,location.ilike.%${search}%`
        );
      }

      const { data, error } = await query;

      if (error) throw error;

      let sortedData = [...(data || [])];

      // 🧮 Apply sorting logic
      switch (sortOption) {
        case "lowToHigh":
          sortedData.sort((a, b) => a.price - b.price);
          break;
        case "highToLow":
          sortedData.sort((a, b) => b.price - a.price);
          break;
        case "aToZ":
          sortedData.sort((a, b) => a.title.localeCompare(b.title));
          break;
        default:
          // newest first by created_at
          sortedData.sort(
            (a, b) =>
              new Date(b.created_at || "").getTime() -
              new Date(a.created_at || "").getTime()
          );
          break;
      }

      setProperties(sortedData);
    } catch (err) {
      console.error("Error fetching properties:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties(filter, searchTerm);
  }, [filter, searchTerm, sortOption]);

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Page Header */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
          Explore Our Properties
        </h1>

        {/* 🔍 Search, Filter, and Sort Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search by title, location, or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          />

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-2">
            {["all", "rent", "sale", "lease"].map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-5 py-2 rounded-lg border transition-all duration-300 ${
                  filter === type
                    ? "bg-emerald-600 text-white shadow-md"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
              >
                {type === "all"
                  ? "All"
                  : type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>

          {/* 🧮 Sort Dropdown */}
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          >
            <option value="newest">Newest Listings</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
            <option value="aToZ">Title: A–Z</option>
          </select>
        </div>

        {/* Loading or Properties Display */}
        {loading ? (
          <p className="text-center text-gray-500">Loading properties...</p>
        ) : properties.length === 0 ? (
          <p className="text-center text-gray-500">
            No properties found matching your search.
          </p>
        ) : (
          /* Property Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <div
                key={property.id}
                className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <img
                  src={property.image}
                  alt={property.title}
                  className="h-56 w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://via.placeholder.com/400x300?text=No+Image";
                  }}
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
                    {property.location} • {property.bedrooms} Beds •{" "}
                    {property.bathrooms} Baths
                  </p>
                  <Link
                    to={`/properties/${property.id}`}
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
