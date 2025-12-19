// src/pages/Rent.tsx
import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import PropertyList from "../components/PropertyList";

export default function Rent() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .eq("type", "rent");

      if (!error) {
        setProperties(data);
      }

      setLoading(false);
    }

    load();
  }, []);

  return (
    <div className="pt-16 px-4">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-emerald-700 mb-6 text-center">
          Rental Properties
        </h1>

        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Browse through available rental apartments, mini flats, and duplexes across Nigeria.
        </p>

        {loading ? (
          <p className="text-center text-gray-500">Loading properties...</p>
        ) : (
          <PropertyList properties={properties} />
        )}
      </div>
    </div>
  );
}
