import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import fs from "fs";
// Example model (adjust schema to match your seeded data)
import Property from "./models/Property.js";
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Endpoint to save emails
app.post("/api/subscribe", (req, res) => {
  const { email } = req.body;

  if (!email || !email.includes("@")) {
    return res.status(400).json({ success: false, message: "Invalid email" });
  }

  // Save email to a text file (later you can connect DB)
  fs.appendFileSync("subscribers.txt", email + "\n");

  res.json({ success: true, message: "Email saved successfully" });
});

// Route to fetch all properties
app.get("/api/properties", async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (err) {
    res.status(500).json({ message: "Error fetching properties", error: err });
  }
});

// ✅ Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/homely", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

