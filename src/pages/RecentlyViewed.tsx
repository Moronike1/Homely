import { useEffect, useState } from "react";
import PropertyList from "../components/PropertyList";
import { getRecentlyViewed } from "../lib/recentlyViewed";
import { supabase } from "../lib/supabaseClient";

export default function RecentlyViewed() {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const ids = getRecentlyViewed();

      if (ids.length === 0) {
        setLoading(false);
        return;
      }

      const { data } = await supabase
        .from("properties")
        .select("*")
        .in("id", ids);

      if (data) setProperties(data);
      setLoading(false);
    }

    load();
  }, []);

  if (loading) {
    return (
      <div className="pt-24 text-center text-gray-500">
        Loading recently viewed...
      </div>
    );
  }

  return (
    <div className="pt-24 px-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">
        Recently Viewed
      </h1>

      {properties.length === 0 ? (
        <p className="text-center text-gray-500">
          You haven’t viewed any properties yet.
        </p>
      ) : (
        <PropertyList properties={properties} />
      )}
    </div>
  );
}
