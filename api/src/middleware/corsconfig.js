const cors = require("cors");
require("dotenv").config({ path: ".././.env" });

const allowedOrigins = process.env.ORIGIN_URL;

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

const corsConfig = cors(corsOptions);

module.exports = corsConfig;
