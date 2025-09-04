// backend/index.js
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

let subscribers = []; // ✅ clean in-memory store

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Homely backend is running 🚀");
});

// Subscription route
app.post("/subscribe", async (req, res) => {
  try {
    const { email } = req.body;
    console.log("Incoming email:", email);

    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    if (subscribers.includes(email)) {
      return res.status(400).json({ success: false, message: "This email is already subscribed." });
    }

    subscribers.push(email);

    return res.status(200).json({ success: true, message: "Subscription successful!" });
  } catch (err) {
    console.error("🔥 Error subscribing:", err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// Sample properties (in-memory)
let properties = [
  {
    id: 1,
    title: "3-Bedroom Apartment in Lekki",
    description: "Spacious apartment with modern facilities.",
    price: 4500000,
    location: "Lekki, Lagos",
    type: "rent",
    images: ["https://via.placeholder.com/300x200"]
  },
  {
    id: 2,
    title: "Luxury Duplex in Ikoyi",
    description: "Elegant 5-bedroom duplex with pool.",
    price: 250000000,
    location: "Ikoyi, Lagos",
    type: "sale",
    images: ["https://via.placeholder.com/300x200"]
  }
];

// Route to fetch all properties
app.get("/properties", (req, res) => {
  res.json(properties);
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
