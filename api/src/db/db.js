const mongoose = require("mongoose");
require("dotenv").config({ path: ".././.env" }); // Make sure this is at the top
const url = process.env.DB_URL;
// Debug: Log environment variables
const connectDB = async () => {
  try {
    // Replace <DB_URI> with your actual MongoDB connection string
    const conn = await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("db connected");
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
