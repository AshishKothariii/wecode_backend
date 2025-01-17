const problemRepository = require("../repository/problemRepository");
const Problem = require("../models/problemModel"); // Assuming your schema is in problemModel.js
const userRepository = require("../repository/userRepository");

const createProblem = async (problemData) => {
  try {
    const user = userRepository.findUserById(problemData.user_id);

    return await problemRepository.createProblem(problemData);
  } catch (err) {
    throw err;
  }
};

const getProblemById = async (problemId) => {
  try {
    // Find the problem by ID
    const problem = await Problem.findById({ _id: problemId });

    // Check if problem exists
    if (!problem) {
      throw new Error("Problem not found");
    }

    const problemData = {
      title: problem.title,
      description: problem.description,
      input_format: problem.input_format,
      output_format: problem.output_format,
      constraints: problem.constraints,
      solved_by: problem.solved_by,
      createdAt: problem.createdAt,
    };

    return problemData;
  } catch (err) {
    throw err; // Error handling
  }
};
const getProblems = async () => {
  try {
    // Find all problems from the database
    const problems = await problemRepository.getProblem();

    return problems;
  } catch (err) {
    throw err; // Error handling
  }
};

module.exports = { createProblem, getProblemById, getProblems };
