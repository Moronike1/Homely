// src/components/PropertyList.tsx
interface Property {
  id: number;
  title: string;
  type: "rent" | "sales" | "lease";
  price: string;
  location: string;
  image: string;
}

const properties: Property[] = [
  {
    id: 1,
    title: "2-Bedroom Apartment",
    type: "rent",
    price: "₦800,000 / year",
    location: "Lekki, Lagos",
    image: "../images/Two Bedroom.png", //pictures from public folder
  },
  {
    id: 2,
    title: "Luxury Mini Flat",
    type: "rent",
    price: "₦600,000 / year",
    location: "Ikeja, Lagos",
    image: "../images/miniflat.jpg",
  },
  {
    id: 3,
    title: "4-Bedroom Duplex",
    type: "sales",
    price: "₦75,000,000",
    location: "Victoria Island, Lagos",
    image: "../images/Duplex.jpg",
  },
  {
    id: 4,
    title: "Office Space",
    type: "lease",
    price: "₦3,000,000 / year",
    location: "Surulere, Lagos",
    image: "../images/Office Space.jpg",
  },
];

export default function PropertyList({ filterType }: { filterType?: string }) {
  const filtered = filterType
    ? properties.filter((p) => p.type === filterType)
    : properties;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {filtered.map((property) => (
        <div
          key={property.id}
          className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition"
        >
          {/* Image fix */}
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h2 className="text-lg font-semibold">{property.title}</h2>
            <p className="text-gray-600">{property.location}</p>
            <p className="text-emerald-600 font-bold mt-2">{property.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
