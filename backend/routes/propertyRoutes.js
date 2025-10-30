// backend/routes/propertyRoutes.js
import express from "express";
import Property from "../models/Property.js";

const router = express.Router();

// GET /api/properties?page=1&limit=6&type=rent&location=Lagos
router.get("/", async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 6;
    const skip = (page - 1) * limit;

    const filters = {};
    if (req.query.type) filters.type = req.query.type;
    if (req.query.location)
      filters.location = { $regex: req.query.location, $options: "i" };

    const total = await Property.countDocuments(filters);
    const properties = await Property.find(filters)
      .skip(skip)
      .limit(limit);

    res.json({
      properties,
      page,
      totalPages: Math.ceil(total / limit),
      total,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching properties" });
  }
});

export default router;
