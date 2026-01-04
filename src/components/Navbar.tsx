import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { adminLogout } from "../lib/adminLogout";
import logo from "../assets/Logo.png";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [role, setRole] = useState<"admin" | "user" | null>(null);

  useEffect(() => {
    async function loadUser() {
      const { data } = await supabase.auth.getSession();
      const currentUser = data.session?.user || null;
      setUser(currentUser);

      if (!currentUser) {
        setRole(null);
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", currentUser.id)
        .single();

      setRole(profile?.role || "user");
    }

    loadUser();

    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      loadUser();
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/">
          <img src={logo} alt="Homely" className="h-10" />
        </Link>

        <div className="flex gap-6 items-center">
          <Link to="/">Home</Link>
          <Link to="/rent">Rent</Link>
          <Link to="/sales">Sales</Link>
          <Link to="/lease">Lease</Link>

          {role === "admin" && (
            <Link
              to="/admin-panel"
              className="font-semibold text-red-600"
            >
              Admin
            </Link>
          )}

          {!user && (
            <>
              <Link to="/login">Login</Link>
              <Link to="/admin-login">Admin Login</Link>
            </>
          )}

          {user && (
            <button
              onClick={adminLogout}
              className="text-red-600 font-semibold"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
