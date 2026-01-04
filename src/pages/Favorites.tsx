import { useEffect, useState } from "react";
import PropertyList from "../components/PropertyList";
import { getFavorites } from "../lib/favorites";
import { supabase } from "../lib/supabaseClient";

export default function Favorites() {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  async function loadFavorites() {
    const ids = getFavorites();

    if (ids.length === 0) {
      setProperties([]);
      setLoading(false);
      return;
    }

    const { data } = await supabase
      .from("properties")
      .select("*")
      .in("id", ids);

    if (data) {
      const ordered = ids
        .map(id => data.find(p => p.id === id))
        .filter(Boolean);

      setProperties(ordered);
    }

    setLoading(false);
  }

  loadFavorites();

  function sync() {
    loadFavorites();
  }

  window.addEventListener("favorites-updated", sync);

  return () => {
    window.removeEventListener("favorites-updated", sync);
  };
}, []);


  if (loading) {
    return (
      <div className="pt-24 text-center text-gray-500">
        Loading favorites...
      </div>
    );
  }

  return (
    <div className="pt-24 px-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">
        Your Favorites
      </h1>
      
      <p className="text-center text-gray-600 mb-8">
  Tap the heart icon to remove a property from your favorites.
</p>


      {properties.length === 0 ? (
        <p className="text-center text-gray-500">
          You have no saved properties yet.
        </p>
      ) : (
        <PropertyList properties={properties} />
      )}
    </div>
  );
}
