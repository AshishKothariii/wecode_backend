const User = require("../models/userModel");

// Save a user in the database
const createUser = async (userData) => {
  try {
    const user = new User(userData);
    return await user.save(); // Save the user document
  } catch (err) {
    throw err; // Propagate error to the service or controller
  }
};

// Find a user by email
const findUserByEmail = async (email) => {
  try {
    // Use Mongoose's findOne method to search by email
    const user = await User.findOne({ email: email });
    return user; // Returns the user document or null if not found
  } catch (err) {
    throw err; // Propagate error to the service or controller
  }
};
const findUserById = async (id) => {
  try {
    // Use Mongoose's findOne method to search by email
    const user = await User.findOne({ _id: id });
    return user; // Returns the user document or null if not found
  } catch (err) {
    throw err; // Propagate error to the service or controller
  }
};
module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
};
