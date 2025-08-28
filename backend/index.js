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
      return res.status(400).json({ error: "Email is required" });
    }

    if (subscribers.includes(email)) {
      return res.status(400).json({ error: "This email is already subscribed." });
    }

    subscribers.push(email);

    return res.status(200).json({ message: "Subscription successful!" });
  } catch (err) {
    console.error("🔥 Error subscribing:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
