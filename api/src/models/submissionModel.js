const mongoose = require("mongoose");
const problem = require("./problemModel"); // Import the Post model
const user = require("./userModel");
const submissionSchema = new mongoose.Schema({
  submission_id: { type: Number, required: true, unique: true },
  language: {
    type: String,
    required: true,
  },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  problem_id: { type: mongoose.Schema.Types.ObjectId, ref: "problem" },
  code: { type: String },
  result: {
    type: String,
    default: "pending",
  },
  test_cases_passed: { type: Number, default: 0 },
});
const Submission = mongoose.model("Submission", submissionSchema);
module.exports = Submission;
