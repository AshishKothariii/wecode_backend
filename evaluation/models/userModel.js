const mongoose = require("mongoose");
const problem = require("./problemModel");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    accepted_count: { type: Number, default: 0 },
    wrong_count: { type: Number, default: 0 },
    tle_count: { type: Number, default: 0 },
    accepted_problem: [{ type: mongoose.Schema.Types.ObjectId, ref: problem }],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
