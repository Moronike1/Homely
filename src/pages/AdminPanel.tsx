import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function AdminPanel() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [properties, setProperties] = useState<any[]>([]);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadProperties();
  }, []);

  async function loadProperties() {
    const { data } = await supabase.from("properties").select("*");
    if (data) setProperties(data);
  }

  async function uploadImages() {
    const urls: string[] = [];

    for (const file of files) {
      const filename = `${Date.now()}-${file.name}`;

      const { error } = await supabase.storage
        .from("property-images")
        .upload(filename, file);

      if (error) continue;

      const { data } = supabase.storage
        .from("property-images")
        .getPublicUrl(filename);

      urls.push(data.publicUrl);
    }

    return urls;
  }

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
        bedrooms: Number(bedrooms),
        bathrooms: Number(bathrooms),
        is_featured: isFeatured,
        gallery
      }
    ]);

    if (error) {
      alert("Save failed");
      return;
    }

    resetForm();
    loadProperties();
  }

  function startEdit(p: any) {
    setTitle(p.title);
    setPrice(String(p.price));
    setLocation(p.location);
    setDescription(p.description);
    setType(p.type);
    setStatus(p.status);
    setBedrooms(String(p.bedrooms));
    setBathrooms(String(p.bathrooms));
    setIsFeatured(p.is_featured);
    setEditingId(p.id);
    setIsEditing(true);
  }

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
        bedrooms: Number(bedrooms),
        bathrooms: Number(bathrooms),
        is_featured: isFeatured
      })
      .eq("id", editingId);

    if (error) {
      alert("Update failed");
      return;
    }

    resetForm();
    loadProperties();
  }

  async function deleteProperty(id: string) {
    await supabase.from("properties").delete().eq("id", id);
    loadProperties();
  }

  function resetForm() {
    setTitle("");
    setPrice("");
    setLocation("");
    setDescription("");
    setType("");
    setStatus("");
    setBedrooms("");
    setBathrooms("");
    setIsFeatured(false);
    setFiles([]);
    setEditingId(null);
    setIsEditing(false);
  }

  return (
    <div className="max-w-6xl mx-auto p-6 pt-20">

      <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>

      <div className="bg-white p-6 rounded-xl shadow mb-10 space-y-4">
        <input className="border p-3 rounded w-full" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
        <input className="border p-3 rounded w-full" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} />
        <input className="border p-3 rounded w-full" placeholder="Location" value={location} onChange={e => setLocation(e.target.value)} />
        <textarea className="border p-3 rounded w-full" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
        <input className="border p-3 rounded w-full" placeholder="Type (rent/sale/lease)" value={type} onChange={e => setType(e.target.value)} />
        <input className="border p-3 rounded w-full" placeholder="Status" value={status} onChange={e => setStatus(e.target.value)} />

        <input className="border p-3 rounded w-full" placeholder="Bedrooms" value={bedrooms} onChange={e => setBedrooms(e.target.value)} />
        <input className="border p-3 rounded w-full" placeholder="Bathrooms" value={bathrooms} onChange={e => setBathrooms(e.target.value)} />

        <label className="flex items-center gap-2">
          <input type="checkbox" checked={isFeatured} onChange={e => setIsFeatured(e.target.checked)} />
          Featured Property
        </label>

        <input type="file" multiple onChange={e => setFiles(Array.from(e.target.files || []))} />

        {isEditing ? (
          <button onClick={updateProperty} className="bg-blue-600 text-white px-6 py-3 rounded w-full">
            Update Property
          </button>
        ) : (
          <button onClick={saveProperty} className="bg-emerald-600 text-white px-6 py-3 rounded w-full">
            Save Property
          </button>
        )}
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-4">All Properties</h2>

        {properties.map(p => (
          <div key={p.id} className="flex justify-between items-center border-b py-3">
            <div>
              <p className="font-semibold">{p.title}</p>
              <p className="text-sm text-gray-500">{p.location}</p>
              {p.is_featured && <span className="text-emerald-600 text-xs">Featured</span>}
            </div>

            <div className="space-x-3">
              <button className="text-blue-600" onClick={() => startEdit(p)}>Edit</button>
              <button className="text-red-600" onClick={() => deleteProperty(p.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
