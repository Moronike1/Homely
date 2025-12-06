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
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const agentNumber = "2347034609530";   // Your phone number without the "+"


  // Load property details
  useEffect(() => {
    const load = async () => {
      if (!id) {
        setLoading(false);
        return;
      }

      const data = await getPropertyById(id);
      setProperty(data);
      setLoading(false);

      // Reset main image when page loads
      setMainImageIndex(0);
    };

    load();
  }, [id]);

  if (loading) return <div className="text-center py-10">Loading...</div>;

  if (!property)
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">Property not found.</p>
      </div>
    );

  const gallery = property.gallery || [];

  // Determine the currently displayed main image
  const mainImage =
    gallery.length > 0 ? gallery[mainImageIndex] : property.image;

  return (
    <div className="max-w-5xl mx-auto p-6">

      {/* Back Button */}
      <Link to="/" className="text-blue-600 hover:underline block mb-4">
        ← Back to Properties
      </Link>

      {/* Main Container */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden p-4">

        {/* Main Image */}
        <div className="w-full h-80 rounded-xl overflow-hidden mb-4">
          <img
            src={mainImage}
            alt={property.title}
            className="w-full h-full object-cover cursor-pointer"
            onClick={() => setOpenLightbox(true)}
          />
        </div>

        {/* Thumbnails */}
        {gallery.length > 0 && (
          <div className="grid grid-cols-4 gap-3 mb-6">
            {gallery.map((img, idx) => (
              <div
                key={idx}
                onClick={() => setMainImageIndex(idx)}
                className={`cursor-pointer rounded-lg overflow-hidden border 
                  ${
                    mainImageIndex === idx
                      ? "border-emerald-600 border-2"
                      : "border-gray-300"
                  }`}
              >
                <img
                  src={img}
                  alt="thumbnail"
                  className="h-24 w-full object-cover"
                />
              </div>
            ))}
          </div>
        )}

        {/* Property Info */}
        <h1 className="text-2xl font-bold mb-2">{property.title}</h1>
        <p className="text-gray-600 mb-3">{property.location}</p>

        <p className="text-blue-700 text-xl font-semibold mb-4">
          ₦{property.price.toLocaleString()}
        </p>

        {/* Features */}
        <div className="grid grid-cols-2 gap-4 text-sm mb-6">
          <div className="p-3 bg-gray-100 rounded-xl">
            <span className="font-semibold">Type:</span> {property.type}
          </div>

          <div className="p-3 bg-gray-100 rounded-xl">
            <span className="font-semibold">Status:</span> {property.status}
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-700 leading-relaxed mb-6">
          {property.description}
        </p>

        {/* Contact Agent Section */}
<div className="mt-6 flex flex-col sm:flex-row gap-4">

  {/* WhatsApp Button */}
  <a
    href={`https://wa.me/${agentNumber}?text=Hello, I am interested in the property titled "${property.title}"`}
    target="_blank"
    rel="noopener noreferrer"
    className="flex-1 bg-green-600 text-white py-3 rounded-xl text-center font-semibold"
  >
    WhatsApp Agent
  </a>

  {/* Call Button */}
  <a
    href={`tel:${agentNumber}`}
    className="flex-1 bg-blue-600 text-white py-3 rounded-xl text-center font-semibold"
  >
    Call Agent
  </a>

</div>


        {/* Lightbox */}
        {openLightbox && gallery.length > 0 && (
          <Lightbox
            open={true}
            close={() => setOpenLightbox(false)}
            slides={gallery.map((url) => ({ src: url }))}
            index={mainImageIndex}
          />
        )}
      </div>
    </div>
  );
}
