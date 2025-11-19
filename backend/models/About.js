import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
});

export default mongoose.model("About", aboutSchema);