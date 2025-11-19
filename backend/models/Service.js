import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  title: String,
  description: String,
  icon: String,
});

export default mongoose.model("Service", serviceSchema);
