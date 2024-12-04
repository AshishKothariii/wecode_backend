const jwt = require("jsonwebtoken");
const userRepository = require("../repository/userRepository");

const JWT_SECRET = "your_jwt_secret"; // Replace with your secret key

// Create a new user
const createUser = async (userData) => {
  try {
    // Validation: Check if name, email, and password are provided
    if (!userData.name || !userData.email || !userData.password) {
      throw new Error("All fields (name, email, password) are required");
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
      throw new Error("Invalid email format");
    }

    // Check if user with the same email already exists
    const existingUser = await userRepository.findUserByEmail(userData.email);
    if (existingUser) {
      throw new Error("Email is already in use");
    }

    // Save the user to the database
    const user = await userRepository.createUser(userData);
    return { username: user.username, email: user.useremail };
  } catch (err) {
    throw err;
  }
};

// Login user (with JWT and cookie)
const loginUser = async (email, password, res) => {
  try {
    // Find the user by email
    const user = await userRepository.findUserByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }

    // Check if the password matches (assuming plain text password for now)
    if (user.password !== password) {
      throw new Error("Invalid password");
    }
    // Generate JWT token
    const token = jwt.sign({ id: user._id, email: user.email }, "ashish", {
      expiresIn: "4h",
    });

    // Set JWT token in HTTP-only cookie
    res.cookie("authToken", token, {
      httpOnly: true,
      secure: true, // Set to true in production
      sameSite: "Strict", // Prevents CSRF attacks
      maxAge: 3600000, // 1 hour
    });

    return {
      username: user.username,
      email: user.email,
    };
  } catch (err) {
    throw err;
  }
};
const findById = async (userId) => {
  try {
    const user = await userRepository.findUserById(userId);
    return {
      name: user.name,
      email: user.email,
      profile_pricture_url: user.profile_pricture_url,
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
