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
      code: data.code,
    };
    const result = await submissionService.submit(submissionData);
    return res.status(200).json({
      status: result.result,
      problem_id: result.problem_id,
      language: result.language,
      submission_id: result.submission_id,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });

    throw err;
  }
};
module.exports = { submitByProblemId };
