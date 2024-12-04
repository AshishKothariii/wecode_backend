const cors = require("cors");

const corsConfig = cors({
  origin: "*", // Allowed origins
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
  credentials: true, // Allow credentials
});

module.exports = corsConfig;
