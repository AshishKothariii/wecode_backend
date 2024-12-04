const bcrypt = require("bcrypt");

// Hash a password
const hashPassword = async (password) => {
  try {
    const saltRounds = 10; // Adjust based on performance needs
    return await bcrypt.hash(password, saltRounds);
  } catch (err) {
    throw new Error("Failed to hash password");
  }
};

// Validate a password
const validatePassword = async (inputPassword, storedHashedPassword) => {
  try {
    return await bcrypt.compare(inputPassword, storedHashedPassword);
  } catch (err) {
    throw new Error("Failed to validate password");
  }
};

module.exports = {
  hashPassword,
  validatePassword,
};
