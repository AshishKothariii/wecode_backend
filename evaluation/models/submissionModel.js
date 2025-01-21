const mongoose = require("mongoose");
const problem = require("./problemModel");
const user = require("./userModel");
const submissionSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    language: {
      type: String,
      required: true,
    },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    problem_id: { type: Number, required: true },
    code: { type: String },
    result: {
      type: String,
      default: "pending",
    },
    problem_name: { type: String, required: true },
    test_cases_passed: { type: Number, default: 0 },
  },
  { timestamps: true }
);
const Submission = mongoose.model("Submission", submissionSchema);
module.exports = Submission;
