import mongoose from "mongoose";
import Property from "./models/Property.js";
import { properties } from "./seed/propertyData.js";

const MONGO_URI = "mongodb://127.0.0.1:27017/homely";

async function reseed() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB");

    await Property.deleteMany({});
    console.log("Cleared old properties");

    await Property.insertMany(properties);
    console.log("Inserted new properties");

    mongoose.connection.close();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

reseed();
