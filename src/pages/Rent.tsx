// src/pages/Rent.tsx
import PropertyList from "../components/PropertyList";
import React from "react";

const rentProperties = [
  {
    id: 1,
    title: "Spacious 2-Bedroom Apartment in Lagos",
    description: "A modern apartment located in the heart of Lagos with all amenities.",
    price: "₦5,200,000/year",
    location: "Lagos, Nigeria",
    type: "rent",
    image: "/images/Two Bedroom.png",
  },
  {
    id: 2,
    title: "Luxury Duplex in Victoria Island",
    description: "A luxurious duplex with sea view and top-notch facilities.",
    price: "₦15,000,000/year",
    location: "Victoria Island, Lagos",
    type: "rent",
    image: "/images/Duplex.jpg",
  },
  {
    id: 3,
    title: "3-Bedroom Flat in Yaba",
    description: "A spacious flat perfect for families, close to schools and markets.",
    price: "₦7,500,000/year",
    location: "Yaba, Lagos",
    type: "rent",
    image: "/images/Three Bedroom flat.jpg",
  },
  {
    id: 4,
    title: "Affordable Mini Flat in Ikeja",
    description: "A cozy mini flat ideal for singles or couples, located in Ikeja.",
    price: "₦3,000,000/year",
    location: "Ikeja, Lagos",
    type: "rent",
    image: "/images/miniflat.jpg",
  },
];

export default function Rent() {
  return (
    <div className="pt-16 px-4">
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-emerald-700 mb-6 text-center">
        Rental Properties
      </h1>
      <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
        Browse through available rental apartments, mini flats, and duplexes across Nigeria.
      </p>

      {/* Pass properties into PropertyList */}
      <PropertyList properties={rentProperties} filterType="rent" />
    </div>
    </div>
  );
}
