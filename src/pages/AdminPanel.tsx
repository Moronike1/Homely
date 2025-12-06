import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { useDropzone } from "react-dropzone";

export default function AdminPanel() {
  // Form fields
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [propertyGallery, setPropertyGallery] = useState([]);


  // Images
  const [files, setFiles] = useState([]);
  const [previewFiles, setPreviewFiles] = useState([]);

  // Data & actions
  const [properties, setProperties] = useState([]);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // -----------------------------------------
  // LOAD PROPERTIES
  // -----------------------------------------
  async function loadProperties() {
    const { data, error } = await supabase.from("properties").select("*");
    if (!error) setProperties(data);
  }

  useEffect(() => {
    loadProperties();
  }, []);

  // -----------------------------------------
  // UPLOAD IMAGES
  // -----------------------------------------
  async function uploadImages() {
    const urls = [];

    if (!files || files.length === 0) return urls;

    for (const file of files) {
      const filename = `${Date.now()}-${file.name}`;

      const { error } = await supabase.storage
        .from("property-images")
        .upload(filename, file);

      if (error) {
        alert("Upload failed: " + file.name);
        continue;
      }

      const publicUrl = supabase.storage
        .from("property-images")
        .getPublicUrl(filename).data.publicUrl;

      urls.push(publicUrl);
    }

    return urls;
  }

  // -----------------------------------------
  // SAVE NEW PROPERTY
  // -----------------------------------------
  async function saveProperty() {
    const gallery = await uploadImages();

    const { error } = await supabase.from("properties").insert([
      {
        title,
        price: Number(price),
        location,
        description,
        type,
        status,
        gallery,
      },
    ]);

    if (error) {
      alert("Error saving property");
      return;
    }

    resetForm();
    loadProperties();
    alert("Property added successfully");
  }

  // -----------------------------------------
  // START EDITING
  // -----------------------------------------
 function startEdit(property) {
  setTitle(property.title);
  setPrice(property.price);
  setLocation(property.location);
  setDescription(property.description);
  setType(property.type);
  setStatus(property.status);

  setEditingId(property.id);
  setIsEditing(true);

  // Load existing gallery
  setPropertyGallery(property.gallery || []);
}


  // -----------------------------------------
  // UPDATE PROPERTY
  // -----------------------------------------
  async function updateProperty() {
    const { error } = await supabase
      .from("properties")
      .update({
        title,
        price: Number(price),
        location,
        description,
        type,
        status,
      })
      .eq("id", editingId);

    if (error) {
      alert("Update failed");
      return;
    }

    async function deleteImage(imageUrl) {
  if (!editingId) return;

  const filename = imageUrl.split("/").pop();

  // Delete from storage
  const { error: storageError } = await supabase.storage
    .from("property-images")
    .remove([filename]);

  if (storageError) {
    alert("Error deleting image");
    return;
  }

  // Remove from gallery array
  const newGallery = propertyGallery.filter((img) => img !== imageUrl);

  const { error: dbError } = await supabase
    .from("properties")
    .update({ gallery: newGallery })
    .eq("id", editingId);

  if (dbError) {
    alert("Error updating gallery");
    return;
  }

  setPropertyGallery(newGallery);
  alert("Image removed");
}


    resetForm();
    loadProperties();
    alert("Property updated successfully");
  }

  // -----------------------------------------
  // DELETE PROPERTY
  // -----------------------------------------
  async function deleteProperty(id) {
    const { error } = await supabase.from("properties").delete().eq("id", id);

    if (error) {
      alert("Delete failed");
      return;
    }

    loadProperties();
    alert("Property deleted");
  }

  // -----------------------------------------
  // RESET FORM
  // -----------------------------------------
  function resetForm() {
    setTitle("");
    setPrice("");
    setLocation("");
    setDescription("");
    setType("");
    setStatus("");
    setFiles([]);
    setPreviewFiles([]);
    setEditingId(null);
    setIsEditing(false);
  }

  // -----------------------------------------
  // DRAG & DROP (DROPZONE)
  // -----------------------------------------
  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 10) {
      alert("You can upload a maximum of 10 images.");
      return;
    }

    setFiles(acceptedFiles);

    setPreviewFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, { preview: URL.createObjectURL(file) })
      )
    );
  };

  {/* EXISTING GALLERY IMAGES WHEN EDITING */}
{isEditing && propertyGallery?.length > 0 && (
  <div className="mt-4">
    <h3 className="font-semibold mb-2">Existing Images</h3>

    <div className="grid grid-cols-3 gap-4">
      {propertyGallery.map((img, idx) => (
        <div key={idx} className="relative group">

          <img
            src={img}
            className="h-28 w-full object-cover rounded-lg shadow"
          />

          {/* Delete Button */}
          <button
            onClick={() => deleteImage(img)}
            className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-7 h-7 flex items-center justify-center opacity-80 group-hover:opacity-100"
          >
            ×
          </button>

        </div>
      ))}
    </div>
  </div>
)}


  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: true,
    maxFiles: 10,
  });

  // -----------------------------------------
  // SEARCH FILTER
  // -----------------------------------------
  const filteredProperties = properties.filter((p) =>
    [
      p.title,
      p.location,
      p.type,
      p.status,
    ].some((field) =>
      field?.toLowerCase().includes(search.toLowerCase())
    )
  );

  // -----------------------------------------
  // RENDER
  // -----------------------------------------
  return (
    <div className="max-w-6xl mx-auto p-6 pt-20">

      {/* Logout button */}
      <div className="flex justify-end mb-6">
        <button
          onClick={async () => {
            await supabase.auth.signOut();
            window.location.href = "/admin-login";
          }}
          className="px-4 py-2 bg-red-600 text-white rounded-lg"
        >
          Logout
        </button>
      </div>

      {/* FORM SECTION */}
      <div className="bg-white shadow-md rounded-xl p-6 mb-12">
        <h1 className="text-2xl font-bold mb-6">
          {isEditing ? "Edit Property" : "Add New Property"}
        </h1>

        <div className="grid grid-cols-1 gap-4">

          <input className="border p-3 rounded" placeholder="Title"
            value={title} onChange={(e) => setTitle(e.target.value)} />

          <input className="border p-3 rounded" placeholder="Price"
            value={price} onChange={(e) => setPrice(e.target.value)} />

          <input className="border p-3 rounded" placeholder="Location"
            value={location} onChange={(e) => setLocation(e.target.value)} />

          <textarea className="border p-3 rounded" rows={4} placeholder="Description"
            value={description} onChange={(e) => setDescription(e.target.value)} />

          <input className="border p-3 rounded" placeholder="Type"
            value={type} onChange={(e) => setType(e.target.value)} />

          <select
            className="border p-3 rounded"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">Select Status</option>
            <option value="Available">Available</option>
            <option value="Sold">Sold</option>
            <option value="Rented">Rented</option>
            <option value="Under Review">Under Review</option>
          </select>

          {/* DROPZONE */}
          <div
            {...getRootProps()}
            className={`border-2 border-dashed p-6 rounded-xl text-center cursor-pointer 
              ${isDragActive ? "border-emerald-600 bg-emerald-50" : "border-gray-400"}`}
          >
            <input {...getInputProps()} />
            <p className="text-gray-600">
              Drag images here, or <span className="text-emerald-600">browse</span>
            </p>
          </div>

          {/* Image previews */}
          {previewFiles.length > 0 && (
            <div className="grid grid-cols-3 gap-3 mt-4">
              {previewFiles.map((file, idx) => (
                <img
                  key={idx}
                  src={file.preview}
                  className="h-28 w-full object-cover rounded-lg shadow"
                />
              ))}
            </div>
          )}

          {/* Submit button */}
          {isEditing ? (
            <button
              onClick={updateProperty}
              className="bg-blue-600 text-white p-3 rounded-lg"
            >
              Update Property
            </button>
          ) : (
            <button
              onClick={saveProperty}
              className="bg-emerald-600 text-white p-3 rounded-lg"
            >
              Save Property
            </button>
          )}
        </div>
      </div>

      {/* SEARCH BAR */}
      <input
        className="w-full p-3 border rounded-lg mb-4"
        placeholder="Search by title, location, type, or status..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* PROPERTY TABLE */}
      <div className="bg-white shadow-md rounded-xl p-6">
        <h2 className="text-xl font-bold mb-4">All Properties</h2>

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 border">Title</th>
              <th className="p-3 border">Price</th>
              <th className="p-3 border">Location</th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredProperties.map((p) => (
              <tr key={p.id} className="border-b">
                <td className="p-3">{p.title}</td>
                <td className="p-3">₦{p.price.toLocaleString()}</td>
                <td className="p-3">{p.location}</td>

                <td className="p-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold
                    ${p.status === "Available" ? "bg-green-100 text-green-700" : ""}
                    ${p.status === "Sold" ? "bg-red-100 text-red-700" : ""}
                    ${p.status === "Rented" ? "bg-blue-100 text-blue-700" : ""}
                    ${p.status === "Under Review" ? "bg-yellow-100 text-yellow-700" : ""}
                  `}>
                    {p.status}
                  </span>
                </td>

                <td className="p-3 space-x-3">
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => startEdit(p)}
                  >
                    Edit
                  </button>

                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => deleteProperty(p.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}
