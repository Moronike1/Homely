// src/pages/Lease.tsx
import PropertyList from "../components/PropertyList";
import React from "react";

const leaseProperties = [
  {
    id: 1,
    title: "Office Space in Victoria Island",
    description: "Spacious office space with 24/7 power supply and internet facilities.",
    price: "₦12,000,000/year",
    location: "Victoria Island, Lagos",
    type: "lease",
    image: "/images/Office Space.jpg",
  },
  {
    id: 2,
    title: "Warehouse in Apapa",
    description: "Large warehouse suitable for logistics, storage, and distribution.",
    price: "₦25,000,000/year",
    location: "Apapa, Lagos",
    type: "lease",
    image: "/images/Warehouse.jpg",
  },
    {
    id: 3,
    title: "Farmland for lease in Ogun",
    description: "A fertile piece of land suitable for agricultural activities.",
    price: "₦5,000,000/year",
    location: "Ogun State",
    type: "lease",
    image: "/images/Farmland.png",
  },
];

export default function Lease() {
  return (
    <div className="pt-16 px-4">
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-emerald-700 mb-6 text-center">
        Lease Properties
      </h1>
      <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
        Find office spaces, warehouses, and commercial properties for lease across Nigeria.
      </p>

      <PropertyList properties={leaseProperties} filterType="lease" />
    </div>
    </div>
  );
}
