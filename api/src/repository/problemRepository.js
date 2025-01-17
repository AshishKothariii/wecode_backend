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
    const problem = await Problem.findOne({ problem_id: id });
    return problem;
  } catch (err) {
    throw err;
  }
};
const getProblem = async () => {
  try {
    const problems = await Problem.find();
    const problemsData = problems.map((problem) => ({
      problemId: problem.problem_id, // MongoDB _id field is used as problemId
      problemTitle: problem.title,
      solvedBy: problem.solved_by,
      user_name: problem.user_name,
    }));
    return problemsData;
  } catch (err) {
    throw err;
  }
};
module.exports = { createProblem, getProblemById, getProblem };
