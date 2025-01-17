const mongoose = require("mongoose");
require("dotenv").config({ path: ".././.env" }); // Make sure this is at the top
const url = process.env.DB_URL;
const dbName = process.env.dbName;
// Debug: Log environment variables
const connectDB = async () => {
  try {
    console.log(url);
    // Replace <DB_URI> with your actual MongoDB connection string
    const conn = await mongoose.connect(url);
    console.log("db connected");
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
