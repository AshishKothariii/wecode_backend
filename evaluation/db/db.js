const mongoose = require("mongoose");
require("dotenv").config({ path: "./.env" });

const url = process.env.DB_URL;
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(url);
    console.log("db connected");
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
