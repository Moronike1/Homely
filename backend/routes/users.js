// backend/routes/users.js
import express from "express";
import User from "../models/User.js";

const router = express.Router();

/**
 * GET /api/users
 * Return all users (sorted newest first)
 */
router.get("/", async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

/**
 * POST /api/users
 * Create a new user (useful for seed/testing)
 * Body: { name, email, status? }
 */
router.post("/", async (req, res) => {
  try {
    const { name, email, status } = req.body;
    if (!name || !email) return res.status(400).json({ error: "Name and email are required" });

    const newUser = new User({ name, email, status });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ error: "Failed to create user" });
  }
});

/**
 * GET /api/users/seed
 * Insert a few sample users to the DB (safe for development)
 */
router.get("/seed", async (req, res) => {
  try {
    const sample = [
      { name: "John Doe", email: "john@example.com", status: "active" },
      { name: "Jane Smith", email: "jane@example.com", status: "pending" },
      { name: "Tunde Balogun", email: "tunde@example.com", status: "inactive" },
    ];
    // Optionally clear existing (comment out if you don't want deletion)
    // await User.deleteMany({});
    const inserted = await User.insertMany(sample);
    res.json(inserted);
  } catch (err) {
    console.error("Error seeding users:", err);
    res.status(500).json({ error: "Failed to seed users" });
  }
});

/**
 * PUT /api/users/:id/status
 * Update only the status of a user
 * Body: { status: 'active'|'inactive'|'pending' }
 */
router.put("/:id/status", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const allowed = ["active", "inactive", "pending"];
    if (!allowed.includes(status)) return res.status(400).json({ error: "Invalid status" });

    const updated = await User.findByIdAndUpdate(id, { status }, { new: true });
    if (!updated) return res.status(404).json({ error: "User not found" });
    res.json(updated);
  } catch (err) {
    console.error("Error updating user status:", err);
    res.status(500).json({ error: "Failed to update status" });
  }
});

export default router;
