const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userRepository = require("../repository/userRepository");

require("dotenv").config({ path: ".././.env" });
const JWT_SECRET = process.env.JWT_SECRET;
// In userService.js
const createUser = async (userData) => {
  try {
    if (!userData.username || !userData.email || !userData.password) {
      throw new Error("MISSING_FIELDS");
    }

    // Use parallel checks for better performance
    const [existingEmail, existingUsername] = await Promise.all([
      userRepository.findUserByEmail(userData.email),
      userRepository.findUserByUserName(userData.username),
    ]);

    if (existingEmail) throw new Error("EMAIL_EXISTS");
    if (existingUsername) throw new Error("USERNAME_EXISTS");
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    return userRepository.createUser(userData);
  } catch (err) {
    throw err;
  }
};
const loginUser = async (email, password, res) => {
  try {
    const user = await userRepository.findUserByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }

    if (user.password !== password) {
      throw new Error("Incorrect password");
    }

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: "3600000",
    });

    res.cookie("authToken", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
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
      name: user.username,
      email: user.email,
      accepted_count: user.accepted_count,
      tle_count: user.tle_count,
      wrong_count: user.wrong_count,
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
