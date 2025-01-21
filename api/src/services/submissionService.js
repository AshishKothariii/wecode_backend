const producerService = require("./producerService");
const submissionRepository = require("../repository/submissionRepository");
const problemRepository = require("../repository/problemRepository");

const submit = async (submissionData) => {
  try {
    const problem = await problemRepository.getProblemById(
      submissionData.problem_id
    );
    if (!problem) {
      throw new Error("Incorrect problem_id");
    }
    const data = {
      language: submissionData.language,
      user_id: submissionData.user_id,
      problem_id: submissionData.problem_id,
      username: submissionData.username,
      problem_name: problem.title,
      code: submissionData.code,
    };
    const res = await submissionRepository.createSubmission(data);
    producerService.produce(res);
    return res;
  } catch (err) {
    return err;
  }
};
const getSubmissionById = async (data) => {
  try {
    const result = submissionRepository.getSubmissionById(data);
    return result;
  } catch (err) {
    return err;
  }
};
const getSubmissionsByUserName = async (data) => {
  try {
    const result = submissionRepository.getSubmissionsByUserName(data);
    return result;
  } catch (err) {
    return err;
  }
};
const getSubmissionsByProblemId = async (data) => {
  try {
    const result = submissionRepository.getSubmissionsByProblemId(data);

    return result;
  } catch (err) {
    return err;
  }
};
const getSubmissionByProblemUserName = async (data) => {
  try {
    const result = submissionRepository.getSubmissionsByProblemUserName(data);
    return result;
  } catch (err) {
    return err;
  }
};
module.exports = {
  submit,
  getSubmissionById,
  getSubmissionsByProblemId,
  getSubmissionsByUserName,
  getSubmissionByProblemUserName,
};
