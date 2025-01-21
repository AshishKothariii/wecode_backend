const Problem = require("../models/problemModel");
const createProblem = async (problemData) => {
  try {
    if (!problemData.title || !problemData.description) {
      throw new Error("Title and description are required");
    }

    const problem = new Problem(problemData);
    return await problem.save();
  } catch (err) {
    console.error(`Error creating problem: ${err.message}`);
    throw err;
  }
};
const getProblemById = async (id) => {
  try {
    const problem = await Problem.findOne({ problem_id: id });

    if (!problem) {
      throw new Error("Problem not found");
    }

    return problem;
  } catch (err) {
    console.error(`Error fetching problem by ID: ${err.message}`);
    throw err;
  }
};
const getProblem = async () => {
  try {
    const problems = await Problem.find();
    const problemsData = problems.map((problem) => ({
      problemId: problem.problem_id,
      problemTitle: problem.title,
      solvedBy: problem.solved_by,
    }));
    return problemsData;
  } catch (err) {
    throw err;
  }
};
module.exports = { createProblem, getProblemById, getProblem };
