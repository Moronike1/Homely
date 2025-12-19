import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "./lib/supabaseClient";
import { syncFavoritesOnLogin, fetchFavoritesFromSupabase } from "./lib/favoritesSync";

import Home from "./pages/Home";
import Rent from "./pages/Rent";
import Sales from "./pages/Sales";
import Lease from "./pages/Lease";
import Facility from "./pages/Facility";
import Navbar from "./components/Navbar";
import BackToTop from "./components/BackToTop";
import Footer from "./components/Footer";
import ServiceRequestsPage from "./pages/ServiceRequestsPage";
import Properties from "./pages/Properties";
import PropertyDetails from "./components/PropertyDetails";
import AdminPanel from "./pages/AdminPanel";
import AdminLogin from "./pages/AdminLogin";
import Login from "./pages/Login";
import Register from "./pages/Register";

import FloatingWhatsApp from "./components/FloatingWhatsApp";
import FloatingCall from "./components/FloatingCall";
import FloatingEmail from "./components/FloatingEmail";

/* ---------------- Protected Route ---------------- */

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return <div className="p-6 text-center">Checking authentication...</div>;
  }

  if (!session) {
    window.location.href = "/admin-login";
    return null;
  }

  return children;
}

/* ---------------- App ---------------- */

function App() {
  useEffect(() => {
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        await syncFavoritesOnLogin(session.user.id);

        const serverFavorites = await fetchFavoritesFromSupabase(session.user.id);
        localStorage.setItem(
          "homely_favorites",
          JSON.stringify(serverFavorites)
        );
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-grow p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rent" element={<Rent />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/lease" element={<Lease />} />
            <Route path="/facility-management" element={<Facility />} />
            <Route path="/service-requests" element={<ServiceRequestsPage />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/property/:id" element={<PropertyDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/admin-login" element={<AdminLogin />} />

            <Route
              path="/admin-panel"
              element={
                <ProtectedRoute>
                  <AdminPanel />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>

        <Footer />
        <BackToTop />
        <FloatingWhatsApp />
        <FloatingCall />
        <FloatingEmail />
      </div>
    </BrowserRouter>
  );
}

export default App;
