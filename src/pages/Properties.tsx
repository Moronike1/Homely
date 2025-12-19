// src/pages/Properties.tsx
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import PropertyList from "../components/PropertyList";

export default function Properties() {
  const [allProperties, setAllProperties] = useState([]);
  const [filtered, setFiltered] = useState([]);

  // Filter States
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const ITEMS_PER_PAGE = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("");



  // Read search query from URL
  const url = useLocation();
  const params = new URLSearchParams(url.search);
  const searchQuery = params.get("search")?.toLowerCase().trim() || "";

  useEffect(() => {
    loadProperties();
  }, []);

  async function loadProperties() {
    const { data, error } = await supabase.from("properties").select("*");

    if (!error) {
      setAllProperties(data);
      applyFilters(data, searchQuery);
    }
  }


  function applyFilters(source = allProperties, searchTerm = searchQuery) {
    let result = [...source];

    // Global Search
    if (searchTerm !== "") {
      result = result.filter((p) =>
        p.title.toLowerCase().includes(searchTerm) ||
        p.location.toLowerCase().includes(searchTerm) ||
        p.type.toLowerCase().includes(searchTerm) ||
        p.description.toLowerCase().includes(searchTerm)
      );
    }

    // Location Filter
    if (location.trim() !== "") {
      result = result.filter((p) =>
        p.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    // Type Filter
    if (type !== "") {
      result = result.filter((p) => p.type === type);
    }

    // Price Filters
    if (minPrice !== "") {
      result = result.filter((p) => p.price >= Number(minPrice));
    }
    if (maxPrice !== "") {
      result = result.filter((p) => p.price <= Number(maxPrice));
    }

    // Bedrooms Filter
    if (bedrooms !== "") {
      result = result.filter((p) => Number(p.bedrooms) === Number(bedrooms));
    }

    // Bathrooms Filter
    if (bathrooms !== "") {
      result = result.filter((p) => Number(p.bathrooms) === Number(bathrooms));
    }

if (sortBy === "newest") {
  result.sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
}

if (sortBy === "price_low") {
  result.sort((a, b) => a.price - b.price);
}

if (sortBy === "price_high") {
  result.sort((a, b) => b.price - a.price);
}

    setFiltered(result);
    setCurrentPage(1);

  }

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

const paginatedProperties = filtered.slice(
  (currentPage - 1) * ITEMS_PER_PAGE,
  currentPage * ITEMS_PER_PAGE
);


  return (
    <div className="pt-20 px-6 max-w-7xl mx-auto">

      <h1 className="text-3xl font-bold text-emerald-700 mb-8 text-center">
        Browse Properties
      </h1>

      {/* Filters Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">

        <input
          placeholder="Location"
          className="border p-3 rounded"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <select
          className="border p-3 rounded"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="">Type</option>
          <option value="rent">Rent</option>
          <option value="sale">Sale</option>
          <option value="lease">Lease</option>
        </select>

        <input
          placeholder="Min Price"
          className="border p-3 rounded"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />

        <input
          placeholder="Max Price"
          className="border p-3 rounded"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />

        <select
          className="border p-3 rounded"
          value={bedrooms}
          onChange={(e) => setBedrooms(e.target.value)}
        >
          <option value="">Bedrooms</option>
          <option value="1">1 Bedroom</option>
          <option value="2">2 Bedrooms</option>
          <option value="3">3 Bedrooms</option>
          <option value="4">4 Bedrooms</option>
          <option value="5">5 Bedrooms</option>
        </select>

        <select
          className="border p-3 rounded"
          value={bathrooms}
          onChange={(e) => setBathrooms(e.target.value)}
        >
          <option value="">Bathrooms</option>
          <option value="1">1 Bathroom</option>
          <option value="2">2 Bathrooms</option>
          <option value="3">3 Bathrooms</option>
          <option value="4">4 Bathrooms</option>
        </select>

      </div>

      <select
  className="border p-3 rounded"
  value={sortBy}
  onChange={(e) => setSortBy(e.target.value)}
>
  <option value="">Sort By</option>
  <option value="newest">Newest</option>
  <option value="price_low">Price: Low to High</option>
  <option value="price_high">Price: High to Low</option>
</select>


      <button
        onClick={() => applyFilters()}
        className="bg-emerald-600 text-white px-6 py-3 rounded-lg mb-10"
      >
        Apply Filters
      </button>

      {/* Display List */}
     <PropertyList properties={paginatedProperties} />

    </div>
  );
}
