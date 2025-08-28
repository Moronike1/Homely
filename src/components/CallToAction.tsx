"use client";

import { useState } from "react";

export default function CTA() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Submitting email:", email); //log

    try {
      const res = await fetch("http://localhost:5000/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

     

      console.log("Raw response:", res);

       const data = await res.json();
      console.log("Backend response data:", data);

      if (res.ok) {
        setMessage(data.message || "Subscription successful!");
        setEmail("");
      } else {
        setMessage(`❌ ${data.message || data.error || "Unknown error."}`); // Improved error handling
      }
    } catch (error) {
      console.error(error);
      setMessage("⚠️ Something went wrong. Try again.");
    }
  };

  return (
    <section className="bg-gray-900 text-white py-16 px-6 text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Stay updated with Homely 🚀
      </h2>
      <p className="mb-6 text-gray-300">
        Subscribe to our newsletter and never miss an update.
      </p>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row items-center justify-center gap-4 max-w-lg mx-auto"
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="w-full md:w-auto flex-1 px-4 py-3 rounded-2xl text-black outline-none"
        />
        <button
          type="submit"
          className="bg-lime-500 hover:bg-lime-600 text-black px-6 py-3 rounded-2xl font-semibold shadow-lg"
        >
          Subscribe
        </button>
      </form>

      {message && (
        <p className="mt-4 text-sm text-lime-400 font-medium">{message}</p>
      )}
    </section>
  );
}