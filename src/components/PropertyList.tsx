import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { getProperties } from "../api/propertyService";
import { getFavorites, toggleFavorite } from "../lib/favorites";
import { toggleCompare, getCompareList } from "../lib/compare";




interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  type: string;
  status: string;
  bedrooms: number;
  bathrooms: number;
  is_featured?: boolean;
  image?: string;
  gallery?: string[];
}

export default function PropertyList({
  properties
}: {
  properties?: Property[];
}) {
  const [list, setList] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [openGallery, setOpenGallery] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [compareList, setCompareList] = useState<string[]>([]);

  useEffect(() => {
  setCompareList(getCompareList());
}, []);


  /* Load favorites */
  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  /* Load properties */
  useEffect(() => {
    async function load() {
      if (properties) {
        setList(properties);
        setLoading(false);
        return;
      }

      const data = await getProperties();
      setList(data);
      setLoading(false);
    }

    load();
  }, [properties]);

  function handleCompareClick(
  e: React.MouseEvent,
  propertyId: string
) {
  e.preventDefault();
  e.stopPropagation();

  const updated = toggleCompare(propertyId);
  setCompareList(updated);
}


  function handleFavoriteClick(
    e: React.MouseEvent,
    propertyId: string
  ) {
    e.preventDefault();
    e.stopPropagation();

    const updated = toggleFavorite(propertyId);
    setFavorites(updated);

    window.dispatchEvent(new Event("favorites-updated"));
  }

  if (loading) {
    return (
      <div className="text-center py-10">
        Loading properties...
      </div>
    );
  }

  if (list.length === 0) {
    return (
      <div className="text-center py-10">
        No properties found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {list.map((property) => (
        <Link
          to={`/property/${property.id}`}
          key={property.id}
        >
          {/* CARD */}
          <div className="relative bg-white rounded-2xl shadow-md hover:shadow-lg transition overflow-hidden">

            <button
  onClick={(e) => handleCompareClick(e, property.id)}
  className="absolute bottom-3 right-3 bg-white/90 px-3 py-1 text-xs rounded shadow"
>
  {compareList.includes(property.id) ? "Remove" : "Compare"}
</button>


            {/* ❤️ FAVORITE HEART (STEP 4 IS HERE) */}
            <button
              onClick={(e) =>
                handleFavoriteClick(e, property.id)
              }
              className="absolute top-3 right-3 bg-white/90 p-2 rounded-full shadow hover:scale-105 transition z-10"
            >
              <Heart
                size={18}
                className={
                  favorites.includes(property.id)
                    ? "fill-red-500 text-red-500"
                    : "text-gray-500"
                }
              />
            </button>

            {/* Featured badge */}
            {property.is_featured && (
              <span className="absolute top-3 left-3 bg-emerald-600 text-white text-xs px-3 py-1 rounded-full z-10">
                Featured
              </span>
            )}

            {/* Main image */}
            <img
              src={
                property.image ||
                property.gallery?.[0]
              }
              alt={property.title}
              className="w-full h-56 object-cover"
            />

            {/* Info */}
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-1">
                {property.title}
              </h2>

              <span className="inline-block text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-700 mb-2">
                {property.status}
              </span>

              <p className="text-sm text-gray-600 mb-2">
                {property.location}
              </p>

              <p className="font-bold text-blue-700">
                ₦{property.price.toLocaleString()}
              </p>

              <div className="flex gap-4 text-sm text-gray-600 mt-2">
                <span>{property.bedrooms} Beds</span>
                <span>{property.bathrooms} Baths</span>
              </div>
            </div>

            {/* Gallery thumbnails */}
            {property.gallery &&
              property.gallery.length > 1 && (
                <div className="flex gap-2 px-4 pb-4 overflow-x-auto">
                  {property.gallery
                    .slice(1)
                    .map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        className="w-20 h-20 object-cover rounded-lg border cursor-pointer"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setOpenGallery(property.id);
                        }}
                      />
                    ))}
                </div>
              )}

            {/* Lightbox */}
            {openGallery === property.id &&
              property.gallery && (
                <Lightbox
                  open={true}
                  close={() =>
                    setOpenGallery(null)
                  }
                  slides={property.gallery.map(
                    (url) => ({ src: url })
                  )}
                />
              )}
          </div>
        </Link>
      ))}
    </div>
  );
}
