const cors = require("cors");
require("dotenv").config({ path: ".././.env" });
const origin_url = process.env.ORIGIN_URL; // Replace with your actual secret

const corsConfig = cors({
  origin: origin_url, // Allowed origins
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
  credentials: true, // Allow credentials
});

module.exports = corsConfig;
