import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { adminLogout } from "../lib/adminLogout";

export default function AdminPanel() {
  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState<any[]>([]);

  // ---------------- ADMIN CHECK ----------------
  useEffect(() => {
    async function checkAdmin() {
      const { data: sessionData } = await supabase.auth.getSession();
      const user = sessionData.session?.user;

      if (!user) {
        window.location.href = "/admin-login";
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (error || data?.role !== "admin") {
        window.location.href = "/";
        return;
      }

      // ✅ admin confirmed
      loadProperties();
    }

    checkAdmin();
  }, []);

  // ---------------- LOAD PROPERTIES ----------------
  async function loadProperties() {
    const { data } = await supabase
      .from("properties")
      .select("*")
      .order("created_at", { ascending: false });

    setProperties(data || []);
    setLoading(false);
  }

  // ---------------- UI STATES ----------------
  if (loading) {
    return (
      <div className="pt-24 text-center text-gray-500">
        Loading admin panel...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto pt-24 p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
      <div className="flex justify-end mb-6">
  <button
    onClick={adminLogout}
    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
  >
    Logout
  </button>
</div>

      


      <div className="bg-white p-6 rounded-xl shadow">
        {properties.length === 0 ? (
          <p className="text-gray-500">No properties yet.</p>
        ) : (
          properties.map(p => (
            <div
              key={p.id}
              className="flex justify-between items-center border-b py-3"
            >
              <div>
                <p className="font-semibold">{p.title}</p>
                <p className="text-sm text-gray-500">{p.location}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
