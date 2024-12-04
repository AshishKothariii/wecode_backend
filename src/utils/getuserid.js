const jwt = require("jsonwebtoken");

const JWT_SECRET = "your_jwt_secret"; // Replace with your actual secret

/**
 * Extracts the user ID from the JWT in the cookie.
 * @param {Object} req - The HTTP request object
 * @returns {string|null} - The user ID if valid, otherwise null
 */
const getUserId = (req) => {
  try {
    // Extract the token from the cookie
    const token = req.cookies.authToken;
    if (!token) {
      throw new Error("No token found");
    }

    // Decode the token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Return the user ID from the payload
    return decoded.id || null;
  } catch (err) {
    console.error("Error decoding token:", err.message);
    return null; // Handle error or return null if decoding fails
  }
};

module.exports = { getUserId };
