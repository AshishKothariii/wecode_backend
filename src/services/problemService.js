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
    const problems = await Problem.find();

    // Manually create an array of objects with only the required fields
    const problemsData = problems.map((problem) => ({
      problemId: problem._id, // MongoDB _id field is used as problemId
      problemTitle: problem.title,
      solvedBy: problem.solved_by,
    }));

    return problemsData;
  } catch (err) {
    throw err; // Error handling
  }
};

module.exports = { createProblem, getProblemById, getProblems };
