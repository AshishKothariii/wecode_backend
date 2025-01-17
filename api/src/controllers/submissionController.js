const submissionService = require("../services/submissionService");
const getuserid = require("../utils/getuserid");
const submitByProblemId = async (req, res) => {
  try {
    const user_id = getuserid.getUserId(req);
    console.log(user_id);
    const data = req.body;
    const submissionData = {
      language: data.language,
      user_id: user_id,
      submission_id: data.submission_id,
      problem_id: req.params.id,
      problem_name: data.problem_name,
      code: data.code,
    };
    const result = await submissionService.submit(submissionData);
    return res.status(200).json({
      status: result.result,
      problem_id: result.problem_id,
      language: result.language,
      submission_id: result.submission_id,
      problem_name: result.problem_name,
    });
  } catch (error) {
    res.status(500).json({ err: error.message });

    throw error;
  }
};
const getSubmissionsByProblemId = async (req, res) => {
  try {
    const id = req.params.id;

    const result = await submissionService.getSubmissionsByProblemId({
      problem_id: id,
    });
    return res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.message });
    throw err;
  }
};
const getSubmissionById = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await submissionService.getSubmissionById({
      submission_id: id,
    });
    return res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.message });
    throw err;
  }
};
const getSubmissionByUserId = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await submissionService.getSubmissionsByUserId({
      user_id: id,
    });
    return res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.message });
    throw err;
  }
};
const getSubmissionByProblemUserId = async (req, res) => {
  try {
    console.log(req.params);
    const data = req.params;
    const result = await submissionService.getSubmissionByProblemUserId({
      problem_id: data.problem_id,
      user_id: data.user_id,
    });
    return res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.message });
    throw err;
  }
};
module.exports = {
  submitByProblemId,
  getSubmissionById,
  getSubmissionByUserId,
  getSubmissionsByProblemId,
  getSubmissionByProblemUserId,
};
