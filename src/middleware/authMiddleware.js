const jwt = require("jsonwebtoken");
const userService = require("../services/userService");
const getuserid = require("../utils/getuserid");
require("dotenv").config({ path: ".././.env" });
const JWT_SECRET = process.env.JWT_SECRET; // Replace with your actual secret

const authMiddleware = async (req, res, next) => {
  try {
    // Extract token from headers
    const token = req.cookies.authToken;
    if (!token) {
      return res.status(401).json({ error: "Access token required" });
    }

    // Verify token
    const decoded = jwt.decode(token, JWT_SECRET);
    const user = await userService.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ error: "Invalid token" });
    }

    // Attach user to request

    next();
  } catch (err) {
    throw err;
  }
};

module.exports = authMiddleware;
