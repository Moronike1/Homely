"use client";
import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import logo from "../assets/Logo.png"; // Adjust the path as necessary
import { Link } from "react-router-dom"; // Add this import if using react-router-dom

export default function Footer() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { data, error } = await supabase
      .from("subscribers")
      .insert([{ email }]);

    if (error) {
      setMessage("⚠️ This email might already be subscribed.");
    } else {
      setMessage("✅ Subscribed successfully!");
      setEmail("");
    }

    setLoading(false);
  };

  return (
    <footer className="bg-emerald-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-6 grid gap-10 md:grid-cols-5">
        {/* Brand / About */}
        <div className="md:col-span-2">
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-blue-600">
  <img src={logo} alt="Homely Logo" className="h-10 w-auto hover: opacity-80 transition" />
  
</Link>
          <p className="mt-4 text-gray-300 text-sm leading-relaxed">
            Your trusted partner for rentals, sales, lease, and facility
            management. Making real estate seamless, transparent, and secure.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Navigation</h4>
          <ul className="space-y-2 text-gray-300">
            <li><a href="#rent" className="hover:text-white">Rent</a></li>
            <li><a href="#sales" className="hover:text-white">Sales</a></li>
            <li><a href="#lease" className="hover:text-white">Lease</a></li>
            <li><a href="#facility" className="hover:text-white">Facility Management</a></li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-gray-300">
            <li><a href="#about" className="hover:text-white">About Us</a></li>
            <li><a href="#contact" className="hover:text-white">Contact</a></li>
            <li><a href="#privacy" className="hover:text-white">Privacy Policy</a></li>
            <li><a href="#terms" className="hover:text-white">Terms of Service</a></li>
          </ul>
        </div>

        {/* Newsletter Subscription */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Stay Updated</h4>
          <p className="text-gray-300 text-sm mb-4">
            Subscribe to get the latest updates, property listings, and real estate tips.
          </p>
          <form onSubmit={handleSubscribe} className="flex items-center">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 rounded-l-lg text-black focus:outline-none"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-r-lg font-semibold"
            >
              {loading ? "..." : "Subscribe"}
            </button>
          </form>
          {message && <p className="mt-2 text-sm">{message}</p>}
        </div>
      </div>

      {/* Social Media & Copyright */}
      <div className="mt-10 border-t border-emerald-700 pt-6 flex flex-col md:flex-row items-center justify-between text-gray-400 text-sm">
        <div className="flex space-x-4 mb-4 md:mb-0">
          <a href="https://facebook.com" target="_blank" className="hover:text-emerald-400"><Facebook size={20} /></a>
          <a href="https://twitter.com" target="_blank" className="hover:text-emerald-400"><Twitter size={20} /></a>
          <a href="https://linkedin.com" target="_blank" className="hover:text-emerald-400"><Linkedin size={20} /></a>
          <a href="https://instagram.com" target="_blank" className="hover:text-emerald-400"><Instagram size={20} /></a>
        </div>
        <p>© {new Date().getFullYear()} Homely. All rights reserved.</p>
      </div>
    </footer>
  );
}
