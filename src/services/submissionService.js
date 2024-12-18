const submissionRepository = require("../repository/submissionRepository");
const upload = require("../utils/upload");
const submitByProblemId = async (data) => {
  try {
    const bucket = process.env.Bucket;
    const key = process.env.Key + "/" + data.user_id.toString() + Time.now();
    const submission_url = upload(data.file, bucket, key);
    //enter db

    //evaluation service enter

    //response
  } catch (err) {
    throw err;
  }
};
