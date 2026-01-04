import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";

export default function AdminRoute({
  children
}: {
  children: JSX.Element;
}) {
  const [checking, setChecking] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function checkAdmin() {
      const { data: sessionData } = await supabase.auth.getSession();
      const user = sessionData.session?.user;

      if (!user) {
        navigate("/admin-login", { replace: true });
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (error || data?.role !== "admin") {
        navigate("/", { replace: true });
        return;
      }

      setChecking(false);
    }

    checkAdmin();
  }, [navigate]);

  if (checking) {
    return (
      <div className="pt-24 text-center text-gray-500">
        Checking admin permission...
      </div>
    );
  }

  return children;
}
