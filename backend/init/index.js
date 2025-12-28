const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const User = require("../models/User.js");

if (process.env.NODE_ENV != "production"){
  require("dotenv").config({ path: require("path").join(__dirname, "../.env") });
}

const MONGO_URL = process.env.MONGO_URL;

if (!MONGO_URL) {
  console.error("ERROR: MONGO_URL is not defined in environment variables!");
  console.error("Please create a .env file with your MongoDB connection string.");
  console.error("See .env.example for the required format.");
  process.exit(1);
}

async function main() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("✓ Connected to MongoDB Atlas");
  } catch (err) {
    console.error("✗ Database connection error:", err.message);
    process.exit(1);
  }
}

const initDB = async () => {
  try {
    console.log("\nInitializing database...");

    // Delete existing listings
    await Listing.deleteMany({});
    console.log("✓ Cleared existing listings");

    // Find or create a default user for the listings
    let defaultUser = await User.findOne({ username: "admin" });

    if (!defaultUser) {
      console.log("\n⚠ No admin user found. Please create one:");
      console.log("1. Start the backend: npm start (in backend folder)");
      console.log("2. Use API or frontend to create a user with username 'admin'");
      console.log("3. Run this script again: node init/index.js\n");

      // Create listings with a placeholder owner
      const modifiedData = initData.data.map((obj) => ({
        ...obj,
        owner: new mongoose.Types.ObjectId() // Temporary owner
      }));
      await Listing.insertMany(modifiedData);
      console.log(`✓ Inserted ${modifiedData.length} sample listings (with temporary owner)`);
      console.log("⚠ Remember to create an admin user and re-run this script!");
    } else {
      // Use the found admin user as owner
      const modifiedData = initData.data.map((obj) => ({
        ...obj,
        owner: defaultUser._id
      }));
      await Listing.insertMany(modifiedData);
      console.log(`✓ Inserted ${modifiedData.length} sample listings`);
      console.log(`✓ All listings owned by: ${defaultUser.username}`);
    }

    console.log("\n✓ Database initialization complete!");
    console.log("You can now start the backend with: npm start\n");

  } catch (err) {
    console.error("✗ Error initializing database:", err.message);
    process.exit(1);
  } finally {
    // Close the connection
    await mongoose.connection.close();
    console.log("✓ Database connection closed");
  }
};

// Run the initialization
main().then(() => {
  initDB();
});
