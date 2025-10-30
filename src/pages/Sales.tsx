import PropertyList from "../components/PropertyList";
import React from "react";


const salesProperties = [
  {
    id: 1,
    title: "Luxury 5-Bedroom Mansion in Lekki",
    description: "A beautiful mansion with swimming pool, garden, and modern finishes.",
    price: "₦250,000,000",
    location: "Lekki, Lagos",
    type: "sale",
    image: "../images/mansion.jpg",
  },
  {
    id: 2,
    title: "Modern 3-Bedroom Bungalow in Abuja",
    description: "A comfortable bungalow with secure environment and ample parking.",
    price: "₦80,000,000",
    location: "Gwarinpa, Abuja",
    type: "sale",
    image: "../images/bungalow.jpg",
  },
  {
    id: 3,
    title: "Plot of land for sale in Lagos",
    description: "A prime piece of land suitable for residential or commercial development.",
    price: "₦80,000,000",
    location: "Lekki-epe expressway, Lagos",
    type: "sale",
    image: "../images/for sale.png",
  }
];

export default function Sales() {
  return (
    <div className="pt-16 px-4">
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-emerald-700 mb-6 text-center">
        Properties for Sale
      </h1>
      <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
        Explore houses, bungalows, and luxury mansions available for purchase across Nigeria.
      </p>

      <PropertyList properties={salesProperties} filterType="sale" />
    </div>
    </div>
  );
}
