import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import serviceRequestsRoute from "./routes/serviceRequests.js";
import usersRoute from "./routes/users.js";
import propertyRoutes from "./routes/propertyRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/users", usersRoute);

// Routes
app.use("/api/service-requests", serviceRequestsRoute);
app.use("/api/properties", propertyRoutes);

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/homely", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Test route
app.get("/test", (req, res) => {
  res.send("Backend is running 🚀");
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
