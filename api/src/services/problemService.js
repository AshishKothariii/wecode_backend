const problemRepository = require("../repository/problemRepository");
const Problem = require("../models/problemModel");
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
    const problem = await problemRepository.getProblemById(problemId);
    const problemData = {
      title: problem.title,
      description: problem.description,
      input_cases: problem.sample_test_cases,
      output_cases: problem.sample_output_cases,
      solved_by: problem.solved_by,
      createdAt: problem.createdAt,
    };
    return problemData;
  } catch (err) {
    throw err;
  }
};
const getProblems = async () => {
  try {
    const problems = await problemRepository.getProblem();
    return problems;
  } catch (err) {
    throw err;
  }
};

module.exports = { createProblem, getProblemById, getProblems };
