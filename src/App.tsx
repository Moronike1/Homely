import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Rent from "./pages/Rent";
import Sales from "./pages/Sales";
import Lease from "./pages/Lease";
import Facility from "./pages/Facility";
import Navbar from "./components/Navbar";
import BackToTop from "./components/BackToTop"

function App() {
  return (
    <BrowserRouter>
    <Navbar />
    <div className="p-6">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rent" element={<Rent />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="/lease" element={<Lease />} />
        <Route path="/facility-management" element={<Facility />} />
      </Routes>
    </div>
    <BackToTop />
    </BrowserRouter>
    
  );
}

export default App;