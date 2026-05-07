
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../context/AuthContext";

type Property = {
  id: string;
  title: string;
  price: number;
  location: string;
  description: string;
  type: string;
  bedrooms: number;
  bathrooms: number;
  status: string;
  is_featured: boolean;
  is_published: boolean;
};

export default function AdminPanel() {
  const { user, loading } = useAuth();

  const [properties, setProperties] = useState<Property[]>([]);
  const [fetching, setFetching] = useState(true);

  const [editingId, setEditingId] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [status, setStatus] = useState("available");
  const [isFeatured, setIsFeatured] = useState(false);

useEffect(() => {
  fetchProperties();
 }, 
  []);

async function fetchProperties() {
  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .order("created_at", { ascending: false });

if (!error && data) {
  setProperties(data);
}

setFetching(false);

}

if (loading) {
return <p className="pt-24 text-center">Loading...</p>;
}

if (!user) {
return <Navigate to="/login" replace />;
}

if (user.email !== "moronikeoluwafemi@gmail.com") {
return <Navigate to="/" replace />;
}

async function togglePublish(
  id: string,
  current: boolean,
  propertyStatus: string) {
if (propertyStatus !== "available") {
  alert("Only available properties can be published");
  return;
}

const { error } = await supabase
  .from("properties")
  .update({
    is_published: !current
  })
  .eq("id", id);

if (!error) {
  fetchProperties();
 }
}

async function toggleFeatured(id: string, current: boolean){
  const { error } = await supabase
    .from("properties")
    .update({
  is_featured: !current
})
.eq("id", id);

if (!error) {
  fetchProperties();
  }
}

async function updateProperty() {
if (!editingId) return;

const { error } = await supabase
  .from("properties")
  .update({
    title,
    price: Number(price),
    location,
    description,
    type,
    bedrooms: Number(bedrooms),
    bathrooms: Number(bathrooms),
    status,
    is_featured: isFeatured
  })
  .eq("id", editingId);

if (error) {
  alert(error.message);
  return;
}

resetForm();
fetchProperties();
}

function startEdit(property: Property) {
setEditingId(property.id);

setTitle(property.title || "");
setPrice(String(property.price || ""));
setLocation(property.location || "");
setDescription(property.description || "");
setType(property.type || "");
setBedrooms(String(property.bedrooms || ""));
setBathrooms(String(property.bathrooms || ""));
setStatus(property.status || "available");
setIsFeatured(property.is_featured || false);

window.scrollTo({
  top: 0,
  behavior: "smooth"
});

}

function resetForm() {
setEditingId(null);
setTitle("");
setPrice("");
setLocation("");
setDescription("");
setType("");
setBedrooms("");
setBathrooms("");
setStatus("available");
setIsFeatured(false);
}

return (
<div className="pt-24 px-6">

  <h1 className="text-2xl font-bold mb-6">
    Admin Dashboard
  </h1>

  {editingId && (

    <div className="bg-white p-6 rounded-xl shadow mb-10 space-y-4">

      <h2 className="text-lg font-semibold">
        Edit Property
      </h2>

      <input
        className="border p-2 w-full"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        className="border p-2 w-full"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <input
        className="border p-2 w-full"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      <textarea
        className="border p-2 w-full"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        className="border p-2 w-full"
        placeholder="Type"
        value={type}
        onChange={(e) => setType(e.target.value)}
      />

      <input
        className="border p-2 w-full"
        placeholder="Bedrooms"
        value={bedrooms}
        onChange={(e) => setBedrooms(e.target.value)}
      />

      <input
        className="border p-2 w-full"
        placeholder="Bathrooms"
        value={bathrooms}
        onChange={(e) => setBathrooms(e.target.value)}
      />

      <select
        className="border p-2 w-full"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="available">available</option>
        <option value="sold">sold</option>
        <option value="rented">rented</option>
        <option value="draft">draft</option>
      </select>

      <label className="flex items-center gap-2">

        <input
          type="checkbox"
          checked={isFeatured}
          onChange={() =>
            setIsFeatured(!isFeatured)
          }
        />

        Featured property

      </label>

      <div className="flex gap-3">

        <button
          onClick={updateProperty}
          className="bg-emerald-600 text-white w-full py-3 rounded"
        >
          Update Property
        </button>

        <button
          onClick={resetForm}
          className="bg-gray-400 text-white px-4 py-2 rounded"
        >
          Cancel
        </button>

      </div>
</div>

)}

  {fetching ? (

    <p>Loading properties...</p>

  ) : (

    <div className="overflow-x-auto">

      <table className="w-full border text-sm">

        <thead>

          <tr className="bg-gray-100">

            <th className="p-3 border text-left">
              Title
            </th>

            <th className="p-3 border text-left">
              Price
            </th>

            <th className="p-3 border text-center">
              Status
            </th>

            <th className="p-3 border text-center">
              Publish
            </th>

            <th className="p-3 border text-center">
              Featured
            </th>

            <th className="p-3 border text-center">
              Edit
            </th>

          </tr>

        </thead>

        <tbody>

          {properties.map((property) => (

            <tr key={property.id}>

              <td className="p-3 border">
                {property.title}
              </td>

              <td className="p-3 border">
                ₦{property.price}
              </td>

              <td className="p-3 border text-center">

                <select
                  value={property.status}

                  onChange={async (e) => {

                    const { error } = await supabase
                      .from("properties")

                      .update({
                        status: e.target.value
                      })

                      .eq("id", property.id);

                    if (!error) {
                      fetchProperties();
                    }

                  }}

                  className="border px-2 py-1 rounded"
                >

                  <option value="available">
                    available
                  </option>

                  <option value="sold">
                    sold
                  </option>

                  <option value="rented">
                    rented
                  </option>

                  <option value="draft">
                    draft
                  </option>

                </select>

              </td>

              <td className="p-3 border text-center">

                <button

                  onClick={() =>
                    togglePublish(
                      property.id,
                      property.is_published,
                      property.status
                    )
                  }

                >

                  {property.is_published
                    ? "Unpublish"
                    : "Publish"}

                </button>

              </td>

              <td className="p-3 border text-center">

                <button

                  onClick={() =>
                    toggleFeatured(
                      property.id,
                      property.is_featured
                    )
                  }

                  className="bg-emerald-600 text-white px-3 py-1 rounded"
                >

                  {property.is_featured
                    ? "Remove"
                    : "Feature"}

                </button>

              </td>

              <td className="p-3 border text-center">

                <button

                  onClick={() =>
                    startEdit(property)
                  }

                  className="bg-blue-600 text-white px-3 py-1 rounded"
                >

                  Edit

                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  )}

</div>
);
}
