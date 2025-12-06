import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Rent from "./pages/Rent";
import Sales from "./pages/Sales";
import Lease from "./pages/Lease";
import Facility from "./pages/Facility";
import Navbar from "./components/Navbar";
import BackToTop from "./components/BackToTop";
import Footer from "./components/Footer";
import ServiceRequestsPage from "./pages/ServiceRequestsPage";
import Admin from "./pages/Admin";
import Properties from "./pages/Properties";
import PropertyDetails from "./components/PropertyDetails";
import AdminPanel from "./pages/AdminPanel";
import AdminLogin from "./pages/AdminLogin";
import { supabase } from "./lib/supabaseClient";
import { useEffect, useState } from "react";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import FloatingCall from "./components/FloatingCall";
import FloatingEmail from "./components/FloatingEmail";




function ProtectedRoute({ children }) {
  const [session, setSession] = useState(undefined);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  if (session === undefined) {
    return <div className="p-6 text-center">Checking authentication...</div>;
  }

  if (!session) {
    window.location.href = "/admin-login";
    return null;
  }

  return children;
}

function App() {
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
            <Route path="/admin" element={<Admin />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/property/:id" element={<PropertyDetails />} />

            {/* Admin authentication pages */}
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
