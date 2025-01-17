const jwt = require("jsonwebtoken");
require("dotenv").config({ path: ".././.env" });
const JWT_SECRET = process.env.JWT_SECRET; // Replace with your actual secret

const getUserId = (req) => {
  try {
    // Extract the token from the cookie
    const token = req.cookies.authToken;
    if (!token) {
      throw new Error("No token found");
    }

    // Decode the token
    const decoded = jwt.decode(token, JWT_SECRET);
    console.log(decoded);
    // Return the user ID from the payload
    return decoded.id;
  } catch (err) {
    throw err;
  }
};

module.exports = { getUserId };
