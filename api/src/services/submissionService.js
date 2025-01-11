const producerService = require("./producerService");
const submissionRepository = require("../repository/submissionRepository");
const submit = async (submissionData) => {
  const data = {
    submission_id: submissionData.submission_id,
    language: submissionData.language,
    user_id: submissionData.user_id,
    problem_id: submissionData.problem_id,
    code: submissionData.code,
  };
  const res = await submissionRepository.createSubmission(data);
  console.log(data);
  producerService.produce(submissionData);
  return res;
};
module.exports = { submit };
