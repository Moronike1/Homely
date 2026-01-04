import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { supabase } from "./lib/supabaseClient";
{/* import {
  syncFavoritesOnLogin,
  fetchFavoritesFromSupabase
} from "./lib/favoritesSync"; */}

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
import Favorites from "./pages/Favorites";
// import RecentlyViewed from "./pages/RecentlyViewed";
// import Compare from "./pages/Compare";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import FloatingCall from "./components/FloatingCall";
import FloatingEmail from "./components/FloatingEmail";

function App() {
  useEffect(() => {
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        await syncFavoritesOnLogin(session.user.id);

        const serverFavorites =
          await fetchFavoritesFromSupabase(session.user.id);

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

        <main className="flex-grow p-6 pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rent" element={<Rent />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/lease" element={<Lease />} />
            <Route path="/facility-management" element={<Facility />} />
            <Route path="/service-requests" element={<ServiceRequestsPage />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/property/:id" element={<PropertyDetails />} />
            {/* <Route path="/favorites" element={<Favorites />} /> */}
           {/* <Route path="/recently-viewed" element={<RecentlyViewed />} /> *}
            {/*<Route path="/compare" element={<Compare />} /> */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin-panel" element={<AdminPanel />} />
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
