import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProperties } from "../api/propertyService";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  type: string;
  status: string;
  image?: string;
  gallery?: string[];
}

const PropertyList: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [openGallery, setOpenGallery] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProperties();
        setProperties(data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading properties...</div>;
  }

  if (properties.length === 0) {
    return <div className="text-center py-10">No properties available at the moment.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {properties.map((property) => (
        <Link to={`/property/${property.id}`} key={property.id}>
          <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            {/* Main image */}
            <img
              src={property.image || (property.gallery && property.gallery[0])}
              alt={property.title}
              className="w-full h-56 object-cover cursor-pointer"
            />

            {/* Property info */}
            <div className="p-4">
              <h2 className="text-lg font-semibold">{property.title}</h2>
              <p className="text-sm text-gray-600 mb-2">{property.location}</p>
              <p className="text-gray-700 mb-3 line-clamp-2">{property.description}</p>
              <p className="font-bold text-blue-700">₦{property.price.toLocaleString()}</p>
            </div>

            {/* Gallery thumbnails */}
            {property.gallery && property.gallery.length > 1 && (
              <div className="flex gap-2 px-4 pb-4 overflow-x-auto scrollbar-thin">
                {property.gallery.slice(1).map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`Gallery ${i + 1}`}
                    className="w-20 h-20 rounded-lg object-cover flex-shrink-0 border cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault(); // prevent link navigation
                      e.stopPropagation(); // prevent bubbling
                      setOpenGallery(property.id);
                    }}
                  />
                ))}
              </div>
            )}

            {/* Lightbox for that property */}
            {openGallery === property.id && property.gallery && (
              <Lightbox
                open={true}
                close={() => setOpenGallery(null)}
                slides={property.gallery.map((url) => ({ src: url }))}
              />
            )}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PropertyList;
