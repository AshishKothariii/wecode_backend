const submissionService = require("../services/submissionService");
const submitByProblemId = async (req, res) => {
  try {
    const data = await req.body;
    const submissionData = {
      language: data.language,
      user_id: data.body.user_id,
      problem_id: req.param.id,
      file: req.file,
    };
    submissionService.submitByProblemId(submissionData);
  } catch (err) {
    res.status(500).json({ error: err.message });

    throw err;
  }
};
module.exports = submitByProblemId;
