import mongoose from "mongoose";

const serviceRequestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    default: "N/A",   // 👈 Default if not provided
  },
  serviceType: {
    type: String,
    default: "General",  // 👈 Default if not provided
  },
  description: {
    type: String,
    default: "No description provided", // 👈 Default if not provided
  },
  status: {
    type: String,
    enum: ["pending", "in-progress", "completed"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ServiceRequest = mongoose.model("ServiceRequest", serviceRequestSchema);

export default ServiceRequest;
