const mongoose = require("mongoose");
const problem = require("./problemModel"); // Import the Post model
const user = require("./userModel");
const submissionSchema = new mongoose.Schema({
  language: {
    type: String,
    required: true,
    enum: ["c++", "java", "python"],
  },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  problem_id: { type: mongoose.Schema.Types.ObjectId, ref: "problem" },
  submission_url: { type: String, required: true },
  result: {
    type: String,
    enum: ["accepted", "tle", "wrong_answer", "compilation_error", "error"],
    default: "in queue",
    required: true,
  },
  test_cases_passed: { type: Number },
  test_case_failed: { type: Number },
});
const submission = mongoose.model("Submission", userSchema);
