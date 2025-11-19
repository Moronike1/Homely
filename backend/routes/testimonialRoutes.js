import express from "express";
import Testimonial from "../models/Testimonial";

const router = express.Router();

// ✅ GET: Fetch all testimonials
router.get("/", async (req, res) => {
    try {
        const testimonials = await Testimonial.find();
        res.json(testimonials);
    } catch (err) {
        res.status(500).json({ message: "Error fetching testimonials", error: err });
    }
});
export default router;