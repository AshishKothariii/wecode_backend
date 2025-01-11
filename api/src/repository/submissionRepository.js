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
const getSubmissionBySubmissionId = async (data) => {
  try {
  } catch (err) {
    throw err;
  }
};
const getSubmissionsByProblemId = async (data) => {
  try {
  } catch (err) {
    throw err;
  }
};
const getSubmissionsByUserId = async (data) => {
  try {
  } catch (err) {
    throw err;
  }
};
module.exports = {
  createSubmission,
  updateSubmission,
  getSubmissionBySubmissionId,
  getSubmissionsByProblemId,
  getSubmissionsByUserId,
};
