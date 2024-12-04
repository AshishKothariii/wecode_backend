const jwt = require("jsonwebtoken");
const userRepository = require("../repository/userRepository");

const authMiddleware = async (req, res, next) => {
  try {
    // Extract token from headers
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Access token required" });
    }

    // Verify token
    const decoded = jwt.verify(token, "ashish");

    // Fetch user from database
    const user = await userRepository.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ error: "Invalid token" });
    }

    // Attach user to request
    req.authUser = user;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Authentication failed" });
  }
};

module.exports = authMiddleware;
