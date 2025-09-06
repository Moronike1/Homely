// src/pages/Rent.tsx
import PropertyList from "../components/PropertyList";

export default function Rent() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-emerald-700 mb-6 text-center">
        Rental Properties
      </h1>
      <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
        Browse through available rental apartments, mini flats, and duplexes across Nigeria.
      </p>

      {/* Show only rental properties */}
      <PropertyList filterType="rent" />
    </div>
  );
}
