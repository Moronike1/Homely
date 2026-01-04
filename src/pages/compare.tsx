import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { getCompareList, clearCompare } from "../lib/compare";

export default function Compare() {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      const ids = getCompareList();
      if (ids.length === 0) return;

      const { data } = await supabase
        .from("properties")
        .select("*")
        .in("id", ids);

      if (data) setItems(data);
    }

    load();
  }, []);

  if (items.length === 0) {
    return (
      <div className="pt-24 text-center text-gray-500">
        No properties selected for comparison.
      </div>
    );
  }

  return (
    <div className="pt-24 px-6 max-w-7xl mx-auto">
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">Compare Properties</h1>
        <button
          onClick={() => {
            clearCompare();
            window.location.reload();
          }}
          className="text-red-600"
        >
          Clear
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map(p => (
          <div key={p.id} className="border rounded-xl p-4">
            <h2 className="font-semibold mb-2">{p.title}</h2>
            <p>₦{p.price.toLocaleString()}</p>
            <p>{p.location}</p>
            <p>{p.bedrooms} Beds</p>
            <p>{p.bathrooms} Baths</p>
            <p>Status: {p.status}</p>
            <p>Type: {p.type}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
