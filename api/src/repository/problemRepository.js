const Problem = require("../models/problemModel");
const createProblem = async (problemData) => {
  try {
    const problem = new Problem(problemData);
    return await problem.save();
  } catch (err) {
    throw err;
  }
};
const getProblemById = async (id) => {
  try {
    // Fetch the problem without populating user_id
    const problem = await Problem.findOne({ _id: id });
    return problem;
  } catch (err) {
    throw err;
  }
};
const getProblem = async () => {
  try {
    return await Problem.find();
  } catch (err) {
    throw err;
  }
};
module.exports = { createProblem, getProblemById, getProblem };
