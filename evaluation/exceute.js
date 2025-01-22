const Problem = require("./models/problemModel");
const User = require("./models/userModel");
const Submission = require("./models/submissionModel");

const connectDB = require("./db/db");
const cpp = require("./execution/executecpp");
const { mongoose } = require("mongoose");
const executecpp = async (data) => {
  connectDB();
  try {
    const problem = await Problem.findOne({ problem_id: data.problem_id });

    if (!problem) {
      console.log("Problem not found with problem_id:", data.problem_id);
      return;
    }
    const res = await cpp.executeCpp(
      data.code,
      problem.test_cases,
      problem.output_cases,
      data._id
    );

    if (!res.errorMsg) {
      try {
        const ans = await Submission.findOneAndUpdate(
          { _id: data._id },
          {
            result: "accepted",
            test_cases_passed: res.passed,
          }
        );

        if (!ans) {
          throw new Error("Submission not found");
        }
        const user = await User.findOne({ _id: ans.user_id });
        const isproblem = false;
        for (let i = 0; i < user.accepted_count; i++) {
          console.log("problem id: ", problem._id);
          console.log("accepted problem: ", user.accepted_problem[i]);
          if (user.accepted_problem[i] === problem._id) {
            isproblem = true;
          }
        }
        if (!isproblem) {
          await Problem.findOneAndUpdate(
            { _id: problem._id },
            { $inc: { solved_by: 1 } }
          );
          await User.findOneAndUpdate(
            { _id: ans.user_id },
            {
              $inc: { accepted_count: 1 },
              $push: { accepted_problem: problem._id },
            }
          );
        }
      } catch (error) {
        console.error("Error processing acceptance:", error);
      }
    } else {
      const ans = await Submission.findOneAndUpdate(
        { _id: data._id },
        {
          result: res.errorMsg,
          test_cases_passed: res.passed,
        }
      );
      if (res.errorMsg === "TLE") {
        await User.findOneAndUpdate(
          { username: ans.user_id },
          { $inc: { tle_count: 1 } }
        );
      } else {
        await User.findOneAndUpdate(
          { username: ans.user_id },
          { $inc: { wrong_count: 1 } }
        );
      }
    }

    return;
  } catch (error) {
    console.error("Error finding problem:", error);
  }
};

const executepy = async (data) => {};

module.exports = { executepy, executecpp };
