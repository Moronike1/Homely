import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getPropertyById } from "../api/propertyService";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export default function PropertyDetails() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openLightbox, setOpenLightbox] = useState(false);

  useEffect(() => {
    const load = async () => {
      if (!id) {
        setLoading(false);
        return;
      }
      const data = await getPropertyById(id);
      setProperty(data);
      setLoading(false);
    };
    load();
  }, [id]);

  if (loading) return null;

  if (!property) {
    return (
      <div className="text-center py-10 text-gray-500">
        Property not found.
      </div>
    );
  }

  const gallery = property.gallery || [];

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      
      {/* Back */}
      <Link to="/" className="text-blue-600 hover:underline mb-6 inline-block">
        ← Back to Properties
      </Link>

      {/* Main Image */}
      <div className="w-full h-80 md:h-96 rounded-2xl overflow-hidden shadow-md mb-8">
        <img
          src={property.image || gallery[0]}
          alt={property.title}
          className="w-full h-full object-cover cursor-pointer"
          onClick={() => setOpenLightbox(true)}
        />
      </div>

      {/* Title, Location, Price */}
      <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
        <h1 className="text-3xl font-bold mb-2 text-gray-800">
          {property.title}
        </h1>

        <p className="text-gray-600 mb-3 text-lg">
          {property.location}
        </p>

        <p className="text-blue-700 text-2xl font-semibold mb-6">
          ₦{property.price.toLocaleString()}
        </p>

        <div className="grid grid-cols-2 gap-4 text-sm mb-6">
          <div className="p-3 bg-gray-100 rounded-xl">
            <span className="font-semibold">Type:</span> {property.type}
          </div>
          <div className="p-3 bg-gray-100 rounded-xl">
            <span className="font-semibold">Status:</span> {property.status}
          </div>
        </div>

        <p className="text-gray-700 leading-relaxed text-md">
          {property.description}
        </p>
      </div>

      {/* Gallery Section */}
      {gallery.length > 1 && (
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            More Images
          </h2>

          <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
            {gallery.map((img, i) => (
              <img
                key={i}
                src={img}
                alt=""
                className="w-full h-28 object-cover rounded-xl cursor-pointer border"
                onClick={() => setOpenLightbox(true)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Lightbox */}
      {openLightbox && gallery.length > 0 && (
        <Lightbox
          open={true}
          close={() => setOpenLightbox(false)}
          slides={gallery.map((url) => ({ src: url }))}
        />
      )}
    </div>
  );
}
