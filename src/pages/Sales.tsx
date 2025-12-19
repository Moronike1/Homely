import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import PropertyList from "../components/PropertyList";

export default function Sales() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .eq("type", "sale");

      if (!error) setProperties(data);
      setLoading(false);
    }

    load();
  }, []);

  return (
    <div className="pt-16 px-4">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-700 mb-6 text-center">
          Properties for Sale
        </h1>

        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Explore available houses, duplexes, and apartments for sale across Nigeria.
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
