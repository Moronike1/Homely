import React, { useState } from "react";

export default function Facility() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    serviceType: "",
    description: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Submitting...");

    try {
      const res = await fetch("http://localhost:5000/api/service-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("✅ Request submitted successfully!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          serviceType: "",
          description: "",
        });
      } else {
        setStatus("❌ Failed to submit request. Try again.");
      }
    } catch (error) {
      console.error("Error submitting request:", error);
      setStatus("⚠️ Server error, please try again later.");
    }
  };

  return (
    <div className="pt-16 px-4">
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-emerald-700 mb-6 text-center">
        Facility Service Request
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 border rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 border rounded"
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="w-full p-3 border rounded"
          required
        />
        <select
          name="serviceType"
          value={formData.serviceType}
          onChange={handleChange}
          className="w-full p-3 border rounded"
          required
        >
          <option value="">Select Service Type</option>
          <option value="Plumbing">Plumbing</option>
          <option value="Electrical">Electrical</option>
          <option value="Cleaning">Cleaning</option>
          <option value="Other">Other</option>
        </select>
        <textarea
          name="description"
          placeholder="Describe the issue"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-3 border rounded"
          rows={4}
          required
        />
        <button
          type="submit"
          className="w-full bg-emerald-600 text-white p-3 rounded hover:bg-emerald-700"
        >
          Submit Request
        </button>
      </form>
      {status && <p className="mt-4 text-center">{status}</p>}
    </div>
    </div>
  );
}
