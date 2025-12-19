import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

export default function FeaturedProperties() {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const { data, error } = await supabase
          .from("properties")
          .select("*")
          .eq("is_featured", true);

        if (error) {
          console.error("Featured fetch error:", error);
          setProperties([]);
        } else {
          setProperties(data || []);
        }
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  if (loading) {
    return (
      <p className="text-center py-10 text-gray-500">
        Loading featured properties...
      </p>
    );
  }

  if (properties.length === 0) {
    return (
      <p className="text-center py-10 text-gray-500">
        No featured properties found.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {properties.map((p) => (
        <Link key={p.id} to={`/property/${p.id}`}>
          <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
            <img
              src={p.image || p.gallery?.[0]}
              className="h-56 w-full object-cover"
            />

            <div className="p-4">
              <h3 className="font-semibold">{p.title}</h3>
              <p className="text-sm text-gray-600">{p.location}</p>
              <p className="font-bold text-blue-700 mt-2">
                ₦{p.price.toLocaleString()}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
