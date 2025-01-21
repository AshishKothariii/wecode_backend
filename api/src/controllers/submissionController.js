const submissionService = require("../services/submissionService");
const getuserid = require("../utils/getuserid");
const submitByProblemId = async (req, res) => {
  try {
    const user_id = getuserid.getUserId(req);
    const data = req.body;
    const submissionData = {
      language: data.language,
      user_id: user_id,
      problem_id: req.params.id,
      username: data.username,
      code: data.code,
    };
    const result = await submissionService.submit(submissionData);
    return res.status(200).json({
      submission_id: result._id,
      status: result.result,
      problem_id: result.problem_id,
      username: result.username,
      language: result.language,
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
    console.log(result);
    return res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.message });
    throw err;
  }
};
const getSubmissionById = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    console.log("get");
    const result = await submissionService.getSubmissionById({
      _id: id,
    });
    return res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.message });
    throw err;
  }
};
const getSubmissionByUserName = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await submissionService.getSubmissionsByUserName({
      username: id,
    });
    console.log(result);
    return res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.message });
    throw err;
  }
};
const getSubmissionByProblemUserName = async (req, res) => {
  try {
    const data = req.params;
    const result = await submissionService.getSubmissionByProblemUserName({
      problem_id: data.problem_id,
      username: data.username,
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
  getSubmissionByUserName,
  getSubmissionsByProblemId,
  getSubmissionByProblemUserName,
};
