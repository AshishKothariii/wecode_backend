// Import dependencies
const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const cors = require("cors");

// Import custom middleware
const corsConfig = require("./middleware/corsconfig");
const errorHandler = require("./middleware/errorHandler");
const routes = require("./routes"); // Routes folder

// Create the Express app
const app = express();

//Middleware setup
app.use(helmet()); // Security headers
//app.use(cors(corsConfig)); // Cross-Origin Resource Sharing
app.use(bodyParser.json()); // Parse JSON requests
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded requests

// Set up routes
app.use("/", routes); // Mount all routes under /api
// Handle 404 for unknown routes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Centralized error handler
app.use(errorHandler);

// Export the configured app
module.exports = app;
