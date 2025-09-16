import express from "express";
import ServiceRequest from "../models/ServiceRequest.js";

const router = express.Router();

// ✅ POST request to save service request
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, serviceType, description } = req.body;

    const newRequest = new ServiceRequest({
      name,
      email,
      phone,
      serviceType,
      description,
    });

    await newRequest.save();
    res.status(201).json({ message: "✅ Service request saved successfully!" });
  } catch (error) {
    console.error("Error saving service request:", error);
    res.status(500).json({ error: "❌ Failed to save service request" });
  }
});

// ✅ GET request to fetch all service requests
router.get("/", async (req, res) => {
  try {
    const requests = await ServiceRequest.find().sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    console.error("Error fetching service requests:", error);
    res.status(500).json({ error: "❌ Failed to fetch service requests" });
  }
});

export default router;
