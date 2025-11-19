import express from "express";
import contact from "../models/Contact.js";

const router = express.Router();

// ✅ POST: Save a new contact message
router.post("/", async (req, res) => {
    try {
        const { name, email, message } = req.body;
        const newContact = new contact({
            name,
            email,
            message,
        });
        await newContact.save();
        res.status(201).json({ message: "✅ Contact message saved successfully!" });
    } catch (error) {
        console.error("Error saving contact message:", error);
        res.status(500).json({ error: "❌ Failed to save contact message" });
    }
});
export