// src/components/PropertyList.tsx
import React from "react";

interface Property {
  id: number;
  title: string;
  description: string;
  price: string;
  location: string;
  type: string;
  image: string;
}

interface PropertyListProps {
  properties: Property[];
  filterType?: string;
}

export default function PropertyList({ properties, filterType }: PropertyListProps) {
  // Apply filtering if a filterType is passed
  const filtered = filterType
    ? properties.filter((p) => p.type === filterType)
    : properties;

  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {filtered.map((property) => (
        <div
          key={property.id}
          className="rounded-xl shadow-lg overflow-hidden border bg-white hover:shadow-xl transition"
        >
          {/* Property Image */}
          <img
            src={property.image}
            alt={property.title}
            className="h-48 w-full object-cover"
            onError={(e) => {
              e.currentTarget.src = "/images/placeholder.jpg"; // fallback
            }}
          />

          {/* Property Details */}
          <div className="p-6">
            <h2 className="font-semibold text-lg text-gray-800">{property.title}</h2>
            <p className="text-gray-600">{property.description}</p>
            <p className="text-emerald-700 font-bold mt-2">{property.price}</p>
            <p className="text-sm text-gray-500">{property.location}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
