import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }: { children: JSX.Element }) {
  const [allowed, setAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    async function check() {
      const { data: sessionData } = await supabase.auth.getSession();
      const user = sessionData.session?.user;

      if (!user) {
        setAllowed(false);
        return;
      }

      const { data } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      setAllowed(data?.role === "admin");
    }

    check();
  }, []);

  if (allowed === null) {
    return <div className="pt-24 text-center">Checking admin permission...</div>;
  }

  if (!allowed) {
    return <Navigate to="/" replace />;
  }

  return children;
}
