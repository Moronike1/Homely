import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Rent from "./pages/Rent";
import Sales from "./pages/Sales";
import Lease from "./pages/Lease";
import Facility from "./pages/Facility";
import Navbar from "./components/Navbar";
import BackToTop from "./components/BackToTop";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        {/* Navbar always on top */}
        <Navbar />

        {/* Main content */}
        <main className="flex-grow p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rent" element={<Rent />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/lease" element={<Lease />} />
            <Route path="/facility-management" element={<Facility />} />
          </Routes>
        </main>

        {/* Footer stays at the bottom */}
        <Footer />

        {/* Back to top button floats, not in layout flow */}
        <BackToTop />
      </div>
    </BrowserRouter>
  );
}

export default App;
