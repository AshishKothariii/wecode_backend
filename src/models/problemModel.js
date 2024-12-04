const mongoose = require("mongoose");
const user = require("./userModel");
const problemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    input_format: { type: String, required: true },
    output_format: { type: String, required: true },
    constraints: { type: String, required: true },
    test_cases: { type: [String], required: true },
    output_cases: { type: [String], required: true },
    solved_by: { type: Number, default: 0 },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

module.exports = problemSchema;
