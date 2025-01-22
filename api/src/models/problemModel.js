const mongoose = require("mongoose");
const user = require("./userModel");
const problemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    problem_id: { type: Number, required: true },
    description: { type: String, required: true },
    sample_test_cases: { type: String, required: true },
    sample_output_cases: { type: String, required: true },
    test_cases: { type: [String], required: true },
    output_cases: { type: [String], required: true },
    solved_by: { type: Number, default: 0 },
  },
  { timestamps: true }
);
const Problem = mongoose.model("Problem", problemSchema);

module.exports = Problem;
