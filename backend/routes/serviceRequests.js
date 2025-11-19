// backend/routes/serviceRequests.js
import express from "express";
import ServiceRequest from "../models/ServiceRequest.js";

const router = express.Router();

// POST: Save a new service request
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

    return res.status(201).json({
      message: "Service request submitted successfully",
      data: newRequest,
    });
  } catch (error) {
    console.error("Error saving service request:", error);
    return res.status(500).json({ message: "Failed to submit service request" });
  }
});

export default router;

