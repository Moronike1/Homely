import React from "react";
import axios from "axios";
import { API_BASE_URL } from "../config/apiConfig";

const ContactSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Contact Us</h2>
        <p className="text-gray-600 mb-8">
          Have questions or need assistance? We’re here to help!
        </p>
        <a
          href="mailto:info@homely.com"
          className="inline-block bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Send Us an Email
        </a>
      </div>
    </section>
  );
};

export default ContactSection; // ✅ This line fixes the error
