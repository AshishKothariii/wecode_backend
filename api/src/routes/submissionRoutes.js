const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();
const submissionController = require("../controllers/submissionController");
const rateLimit = require("../middleware/rateLimmiter");

const {
  getSubmissionsByUserId,
} = require("../repository/submissionRepository");
router.post(
  "/problem/:id",
  authMiddleware,
  rateLimit.tokenLimiter,
  submissionController.submitByProblemId
);
router.get(
  "/problem/:id",
  authMiddleware,
  rateLimit.tokenLimiter,

  submissionController.getSubmissionsByProblemId
);
router.get("/:id", authMiddleware, submissionController.getSubmissionById);
router.get(
  "/user/:id",
  authMiddleware,
  rateLimit.tokenLimiter,

  submissionController.getSubmissionByUserId
);
router.get(
  "/problem/:problem_id/user/:user_id",
  authMiddleware,
  rateLimit.tokenLimiter,

  submissionController.getSubmissionByProblemUserId
);

module.exports = router;
