// index.js

const app = require("./app"); // Import the Express app
const connectDB = require("./db/db"); // Import the database connection function

const PORT = process.env.PORT || 3000; // Set the port from environment or default to 3000

// Connect to Database
connectDB();

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Optional: Handle uncaught exceptions and rejections
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection:", reason);
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});
