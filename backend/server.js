import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import fs from "fs";

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Endpoint to save emails
app.post("/api/subscribe", (req, res) => {
  const { email } = req.body;

  if (!email || !email.includes("@")) {
    return res.status(400).json({ success: false, message: "Invalid email" });
  }

  // Save email to a text file (later you can connect DB)
  fs.appendFileSync("subscribers.txt", email + "\n");

  res.json({ success: true, message: "Email saved successfully" });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
