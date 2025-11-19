import express from "express";
import About from "../models/About.js";

const router = express.Router();

// Route to fetch about information
router.get("/", async (req, res) => {
    try {
        const about = await About.find();
        res.json(about);
    } catch (err) {
        res.status(500).json({ message: "Error fetching about information", error: err });
    }
});
export default router;