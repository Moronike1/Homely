import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getPropertyById } from "../api/propertyService";
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

const PropertyDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  console.log("ID from URL:",id)
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [openLightbox, setOpenLightbox] = useState(false);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const data = await getPropertyById(id!);
        setProperty(data);
      } catch (error) {
        console.error("Error fetching property:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  if (loading) return <div className="text-center py-10">Loading property...</div>;
  if (!property) return <div className="text-center py-10">Property not found.</div>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <Link to="/" className="text-blue-600 hover:underline">&larr; Back to Properties</Link>

      <div className="mt-6 bg-white rounded-2xl shadow-md overflow-hidden">
        <img
          src={property.image || (property.gallery && property.gallery[0])}
          alt={property.title}
          className="w-full h-96 object-cover cursor-pointer"
          onClick={() => setOpenLightbox(true)}
        />

        <div className="p-6">
          <h1 className="text-2xl font-semibold mb-2">{property.title}</h1>
          <p className="text-gray-600 mb-4">{property.location}</p>
          <p className="text-gray-700 mb-4">{property.description}</p>
          <p className="font-bold text-blue-700 text-lg mb-4">
            ₦{property.price.toLocaleString()}
          </p>
          <p className="text-sm text-gray-500">
            Type: {property.type} | Status: {property.status}
          </p>
        </div>

        {property.gallery && property.gallery.length > 1 && (
          <div className="flex gap-2 px-6 pb-6 overflow-x-auto scrollbar-thin">
            {property.gallery.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`Gallery ${i + 1}`}
                className="w-28 h-28 rounded-lg object-cover border cursor-pointer"
                onClick={() => setOpenLightbox(true)}
              />
            ))}
          </div>
        )}

        {openLightbox && property.gallery && (
          <Lightbox
            open={true}
            close={() => setOpenLightbox(false)}
            slides={property.gallery.map((url) => ({ src: url }))}
          />
        )}
      </div>
    </div>
  );
};

export default PropertyDetails;
