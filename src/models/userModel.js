const mongoose = require("mongoose");
const problem = require("./problemModel"); // Import the Post model

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // Name is required
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true }, // Email must be unique
    password: { type: String, required: true }, // Password is required
    profile_picture_url: { type: String, default: "hello" },
    accepted_count: { type: Number, default: 0 },
    wrong_count: { type: Number, default: 0 },
    tle_count: { type: Number, default: 0 },
    problem_setter: { type: Boolean, default: false },
    accepted_problem: [{ type: mongoose.Schema.Types.ObjectId, ref: problem }], // List of accepted problems.
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

const User = mongoose.model("User", userSchema);

module.exports = User;
