const express = require("express");
const submissionController = require("../controllers/submissionController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();
/*
router.post("", authMiddleware, submissionController.submitByProblemId);
router.get(
  "/user/:username",
  authMiddleware,
  submissionController.getSubmissionByUserName
);
router.get(
  "/problem/:id",
  authMiddleware,
  submissionController.getSubmissionByProblemId
);
router.get(
  "/:id",
  authMiddleware,
  submissionController.getSubmissionByProblemId
);*/
module.exports = router;
