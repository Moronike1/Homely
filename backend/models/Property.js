import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  category: { type: String, enum: ["Rent", "Sale", "Lease", "Facility"] },
});

export default mongoose.model("Property", propertySchema);
