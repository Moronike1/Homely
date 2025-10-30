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

// GET all service requests
router.get("/", async (req, res) => {
  try {
    const requests = await ServiceRequest.find();
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



/// PUT: Update service request status
router.put("/:id/status", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // validate status
   const validStatuses = ["pending", "in-progress", "completed"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: "❌ Invalid status value" });
    }

    const updatedRequest = await ServiceRequest.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedRequest) {
      return res.status(404).json({ error: "❌ Service request not found" });
    }

    res.json({ message: "✅ Status updated successfully!", request: updatedRequest });
  } catch (error) {
    console.error("Error updating service request status:", error);
    res.status(500).json({ error: "❌ Failed to update status" });
  }
});


export default router;
