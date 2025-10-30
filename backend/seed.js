import { MongoClient } from "mongodb";

const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);

async function seed() {
  try {
    await client.connect();
    const db = client.db("homely");
    const collection = db.collection("servicerequests");

    // Count existing documents
    const count = await collection.countDocuments();

    if (count === 0) {
      console.log("Collection is empty. Inserting seed data...");

      await collection.insertMany([
        {
          phone: "N/A",
          serviceType: "General",
          description: "No description provided",
          status: "Pending",
          createdAt: new Date()
        },
        {
          phone: "08123456789",
          serviceType: "Plumbing",
          description: "Fix kitchen sink leakage",
          status: "In Progress",
          createdAt: new Date()
        },
        {
          phone: "08098765432",
          serviceType: "Electrical",
          description: "Repair faulty socket",
          status: "Completed",
          createdAt: new Date()
        }
      ]);

      console.log("✅ Seeding complete.");
    } else {
      console.log("⚡ Collection already has data. Skipping seeding.");
    }
  } catch (err) {
    console.error("❌ Error seeding database:", err);
  } finally {
    await client.close();
  }
}

seed();
