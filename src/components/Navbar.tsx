import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; // requires installing lucide-react
import logo from "../assets/Logo.png"; // Adjust the path as necessary

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="bg-white shadow-md">
      <div className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-blue-600">
  <img src={logo} alt="Homely Logo" className="h-10 w-auto hover: opacity-80 transition" />
  
</Link>

        <div className="hidden md:flex gap-6 font-medium text-gray-700">
          <Link to="/">Home</Link>
          <Link to="/rent">Rent</Link>
          <Link to="/sales">Sales</Link>
          <Link to="/lease">Lease</Link>
          <Link to="/facility-management">Facility Management</Link>
        </div>

        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 font-medium text-gray-700">
          <Link to="/" onClick={toggleMenu}>Home</Link><br />
          <Link to="/rent" onClick={toggleMenu}>Rent</Link><br />
          <Link to="/sales" onClick={toggleMenu}>Sales</Link><br />
          <Link to="/lease" onClick={toggleMenu}>Lease</Link><br />
          <Link to="/facility-management" onClick={toggleMenu}>Facility Management</Link>
        </div>
      )}
    </nav>
  );
}