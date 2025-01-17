const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt"); // Add bcrypt for hashing passwords
const userRepository = require("../repository/userRepository");

require("dotenv").config({ path: ".././.env" });
const JWT_SECRET = "ashishislord";
// Create a new user
const createUser = async (userData) => {
  try {
    if (!userData.name || !userData.email || !userData.password) {
      throw new Error("All fields (name, email, password) are required");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
      throw new Error("Invalid email format");
    }
    const existingUser = await userRepository.findUserByEmail(userData.email);
    if (existingUser) {
      throw new Error("Email is already in use");
    }

    const user = await userRepository.createUser({
      ...userData,
      password: userData.password, // Save the hashed password
    });

    return { username: user.username, email: user.useremail };
  } catch (err) {
    throw err;
  }
};

const loginUser = async (email, password, res) => {
  try {
    // Find the user by email
    const user = await userRepository.findUserByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }

    // Direct password comparison (plain text)
    if (user.password !== password) {
      throw new Error("Incorrect password");
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: "3600000",
    });

    // Set JWT token in HTTP-only cookie
    res.cookie("authToken", token, {
      httpOnly: true,
      secure: false, // Set to true in production
      sameSite: "Strict", // Prevents CSRF attacks
    });
    return {
      username: user.username,
      email: user.email,
    };
  } catch (err) {
    throw err;
  }
};
// Find user by ID
const findById = async (userId) => {
  try {
    const user = await userRepository.findUserById(userId);
    return {
      name: user.name,
      email: user.email,
      accepted_count: user.accepted_count,
    };
  } catch (err) {
    throw err;
  }
};

module.exports = {
  createUser,
  loginUser,
  findById,
};
