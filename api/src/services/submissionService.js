const producerService = require("./producerService");
const submissionRepository = require("../repository/submissionRepository");
const submit = async (submissionData) => {
  try {
    const data = {
      submission_id: submissionData.submission_id,
      language: submissionData.language,
      user_id: submissionData.user_id,
      problem_id: submissionData.problem_id,
      problem_name: submissionData.problem_name,
      code: submissionData.code,
    };
    const res = await submissionRepository.createSubmission(data);
    console.log(data);
    producerService.produce(submissionData);
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
const getSubmissionsByUserId = async (data) => {
  try {
    const result = submissionRepository.getSubmissionsByUserId(data);
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
const getSubmissionByProblemUserId = async (data) => {
  try {
    const result = submissionRepository.getSubmissionsByProblemUserId(data);
    return result;
  } catch (err) {
    return err;
  }
};
module.exports = {
  submit,
  getSubmissionById,
  getSubmissionsByProblemId,
  getSubmissionsByUserId,
  getSubmissionByProblemUserId,
};
