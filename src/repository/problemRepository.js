const Problem = require("../models/problemModel");
const createProblem = async (problemData) => {
  try {
    const problem = new Problem(problemData);
    return await problem.save();
  } catch (err) {
    throw err;
  }
};
const getProblemById = async (problem_id) => {
  try {
    // Fetch the problem without populating user_id
    return await Problem.findById(problem_id).exec();
  } catch (err) {
    throw new Error("Repository error while fetching problem");
  }
};
module.exports = createProblem;
