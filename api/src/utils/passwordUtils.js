const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  try {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  } catch (err) {
    throw new Error("Failed to hash password");
  }
};

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
