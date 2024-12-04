const mongoose = require("mongoose");
const url = process.env.database_url;
const connectDB = async () => {
  try {
    // Replace <DB_URI> with your actual MongoDB connection string
    const conn = await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
