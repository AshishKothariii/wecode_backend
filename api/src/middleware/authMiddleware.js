const jwt = require("jsonwebtoken");
const userService = require("../services/userService");
require("dotenv").config({ path: ".././.env" });
const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.authToken;
    if (!token) {
      return res.status(401).json({ error: "Access token required" });
    }

    const decoded = jwt.decode(token, JWT_SECRET);
    const user = await userService.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ error: "Invalid token" });
    }

    req.user = user;
    next();
  } catch (err) {
    throw err;
  }
};

module.exports = authMiddleware;
