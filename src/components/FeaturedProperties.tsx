import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  gallery?: string[];
  image?: string;
}

export default function FeaturedProperties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFeatured() {
      try {
        const { data, error } = await supabase
          .from("properties")
          .select("id, title, price, location, gallery, image")
          .eq("is_featured", true)
          .limit(6);

        if (error) {
          console.error("Featured fetch error:", error);
          setProperties([]);
          return;
        }

        setProperties(data || []);
      } finally {
        setLoading(false);
      }
    }

    loadFeatured();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-gray-500 py-10">
        Loading featured properties...
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="text-center text-gray-500 py-10">
        No featured properties available.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {properties.map((p) => (
        <Link key={p.id} to={`/property/${p.id}`}>
          <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
            <img
              src={p.image || p.gallery?.[0]}
              alt={p.title}
              className="h-56 w-full object-cover"
            />

            <div className="p-4">
              <h3 className="font-semibold text-lg mb-1">
                {p.title}
              </h3>

              <p className="text-sm text-gray-600 mb-2">
                {p.location}
              </p>

              <p className="font-bold text-emerald-700">
                ₦{p.price.toLocaleString()}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
