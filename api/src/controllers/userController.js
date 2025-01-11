const userService = require("../services/userService");

const createUser = async (req, res) => {
  try {
    const userData = req.body;
    const user = await userService.createUser(userData, res);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "Error creating user" });
    throw err;
  }
};
const loginUser = async (req, res) => {
  try {
    // Extract email and password from the request body
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Call the service layer to handle login logic
    const token = await userService.loginUser(email, password, res);
    console.log(token);
    // Respond with the authentication token
    res.status(200).json(token);
  } catch (error) {
    res.status(401).json({ error: "Invalid email or password" });
    throw error;
  }
};

const getProfile = async (req, res) => {
  const userId = req.params.id;

  try {
    // Replace with your database logic
    const user = await userService.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Send user data (omit sensitive information)
    res.status(200).json({ user });
  } catch (err) {
    throw err;
  }
};
module.exports = { createUser, loginUser, getProfile };
