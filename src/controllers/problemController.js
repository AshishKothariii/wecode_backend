const { request } = require("express");
const problemService = require("../services/problemService");
const { getUserId } = require("../utils/getuserid");

//also auth
const createProblem = async (req, res) => {
  try {
    const {
      title,
      description,
      input_format,
      output_format,
      constraints,
      test_cases,
      output_cases,
    } = req.body;

    if (!user_id) {
      return res.status(400).json({ message: "User ID is required" });
    }
    user_id = getUserId(req);
    if (!user_id) {
      throw err;
    }
    const problemData = {
      title,
      description,
      input_format,
      output_format,
      constraints,
      test_cases,
      output_cases,
      user_id,
    };

    const newProblem = await problemService.createProblem(problemData);

    res.status(201).json(newProblem);
  } catch (err) {
    throw err;
  }
};

const getProblemById = async (req, res) => {
  try {
    const { problem_id } = req.params;

    if (!problem_id) {
      return res.status(400).json({ message: "Problem ID is required" });
    }

    const problem = await problemService.getProblemById(problem_id);

    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }
    res.status(200).json(problem);
  } catch (err) {
    throw err;
  }
};
const getProblems = async (req, res) => {
  try {
    const problems = await problemService.getProblems();

    res.status(200).json(problems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createProblem, getProblemById, getProblems };