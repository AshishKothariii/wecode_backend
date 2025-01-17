const Submission = require("../models/submissionModel");
const mongoose = require("mongoose");

const createSubmission = async (submissionData) => {
  try {
    const submission = new Submission(submissionData);
    return await submission.save();
  } catch (err) {
    throw err;
  }
};
const updateSubmission = async (submissionData) => {
  try {
  } catch (err) {
    throw err;
  }
};
const getSubmissionById = async (data) => {
  try {
    const result = await Submission.findOne(data);
    return result;
  } catch (err) {
    throw err;
  }
};
const getSubmissionsByProblemId = async (data) => {
  try {
    const results = await Submission.find(data);
    console.log("trying");
    return results.map((result) => ({
      result: result.result,
      submission_id: result.submission_id,
      user_id: result.user_id,
      language: result.language,
      problem_id: result.problem_id,
      user_name: result.user_name,
      problem_name: result.problem_name,
    }));
  } catch (err) {
    throw err;
  }
};
const getSubmissionsByUserId = async (data) => {
  try {
    const results = await Submission.find(data);
    return results.map((result) => ({
      result: result.result,
      submission_id: result.submission_id,
      user_id: result.user_id,
      language: result.language,
      problem_id: result.problem_id,
      problem_name: result.problem_name,
    }));
  } catch (err) {
    throw err;
  }
};
const getSubmissionsByProblemUserId = async (data) => {
  try {
    const { problem_id, user_id } = data;

    const results = await Submission.find({
      problem_id: problem_id,
      user_id: user_id,
    });

    if (results.length === 0) {
      console.log("No submissions found for the given problem_id and user_id.");
      return [];
    }

    return results.map((result) => ({
      result: result.result,
      submission_id: result.submission_id,
      user_id: result.user_id,
      language: result.language,
      problem_id: result.problem_id,
      problem_name: result.problem_name,
    }));
  } catch (err) {
    console.error("Error fetching submissions:", err);
    throw err;
  }
};
module.exports = {
  createSubmission,
  updateSubmission,
  getSubmissionById,
  getSubmissionsByProblemId,
  getSubmissionsByUserId,
  getSubmissionsByProblemUserId,
};
