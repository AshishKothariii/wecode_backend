const userService = require("../services/userService");
const getuserid = require("../utils/getuserid");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: ".././.env" });
const JWT_SECRET = process.env.JWT_SECRET;
const createUser = async (req, res) => {
  try {
    const userData = req.body;
    const user = await userService.createUser(userData);
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: "3600000",
    });
    res.cookie("authToken", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
    });
    result = {
      username: user.username,
      email: user.email,
    };
    res.status(200).json(result);
  } catch (error) {
    console.error("Registration error:", error);

    const errorMapping = {
      EMAIL_EXISTS: {
        status: 409,
        message: "Email is already registered",
      },
      USERNAME_EXISTS: {
        status: 409,
        message: "Username is already taken",
      },
    };

    const knownError = errorMapping[error.message];
    if (knownError) {
      return res.status(knownError.status).json({ error: knownError.message });
    }

    // Handle unexpected errors
    res.status(500).json({
      error: "Registration failed. Please try again later.",
    });
  }
  throw error;
};
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const token = await userService.loginUser(email, password, res);
    res.status(200).json(token);
  } catch (error) {
    res.status(401).json({ error: "Invalid email or password" });
    throw error;
  }
};

const getProfile = async (req, res) => {
  const userId = getuserid.getUserId(req);

  try {
    const user = await userService.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    throw err;
  }
};
module.exports = { createUser, loginUser, getProfile };
