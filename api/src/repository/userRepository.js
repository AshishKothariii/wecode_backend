const User = require("../models/userModel");
const createUser = async (userData) => {
  try {
    const user = new User(userData);
    return await user.save();
  } catch (err) {
    throw err;
  }
};

const findUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email: email });
    return user;
  } catch (err) {
    throw err;
  }
};
const findUserByUserName = async (username) => {
  try {
    const user = await User.findOne({ username: username });
    return user;
  } catch (err) {
    throw err;
  }
};
const findUserById = async (id) => {
  try {
    const user = await User.findOne({ _id: id });
    return user;
  } catch (err) {
    throw err;
  }
};
module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
  findUserByUserName,
};
