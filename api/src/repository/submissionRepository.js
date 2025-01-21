const Submission = require("../models/submissionModel");

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
    return results.map((result) => ({
      result: result.result,
      submission_id: result._id,
      language: result.language,
      problem_id: result.problem_id,
      username: result.username,
      createdAt: result.createdAt,
      problem_name: result.problem_name,
    }));
  } catch (err) {
    throw err;
  }
};
const getSubmissionsByUserName = async (data) => {
  try {
    const results = await Submission.find(data);
    return results.map((result) => ({
      result: result.result,
      submission_id: result._id,
      username: result.username,
      language: result.language,
      createdAt: result.createdAt,
      problem_id: result.problem_id,
      problem_name: result.problem_name,
    }));
  } catch (err) {
    throw err;
  }
};
const getSubmissionsByProblemUserName = async (data) => {
  try {
    const results = await Submission.find({
      problem_id: data.problem_id,

      username: data.username,
    });

    if (results.length === 0) {
      console.log(
        "No submissions found for the given problem_id and username."
      );
      return [];
    }

    return results.map((result) => ({
      result: result.result,
      submission_id: result._id,
      username: result.username,
      language: result.language,
      problem_id: result.problem_id,
      createdAt: result.createdAt,

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
  getSubmissionsByUserName,
  getSubmissionsByProblemUserName,
};
