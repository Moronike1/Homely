// backend/server.js
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import fs from "fs";
import dotenv from "dotenv";

// Import route files
import propertyRoutes from "./routes/propertyRoutes.js";
import serviceRequestRoutes from "./routes/serviceRequests.js";
import userRoutes from "./routes/users.js";

// Import models (optional, if used elsewhere)
import Property from "./models/Property.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// 🧩 Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// 📨 Subscription route (for newsletter or contact form)
app.post("/api/subscribe", (req, res) => {
  const { email } = req.body;

  if (!email || !email.includes("@")) {
    return res.status(400).json({ success: false, message: "Invalid email" });
  }

  try {
    fs.appendFileSync("subscribers.txt", email + "\n");
    res.json({ success: true, message: "✅ Email saved successfully" });
  } catch (error) {
    console.error("Error saving email:", error);
    res.status(500).json({ success: false, message: "❌ Failed to save email" });
  }
});

// 🏡 Property Routes
app.use("/api/properties", propertyRoutes);

// 🧰 Service Request Routes
app.use("/api/service-requests", serviceRequestRoutes);

// 👤 User Routes
app.use("/api/users", userRoutes);

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/homely")
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));


// Root route
app.get("/", (req, res) => {
  res.send("Homely Backend is running successfully...!");
});

// 🚀 Start Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));


