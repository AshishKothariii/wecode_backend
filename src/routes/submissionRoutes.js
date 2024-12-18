const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();
const upload = require("../middleware/multer"); // Multer middleware

router.post(
  "/problem/:id",
  authMiddleware,
  upload,
  submissionController.submitByProblemId
);
/*
router.get("/:id", authMiddleware, submissionController);
router.get("/problem/:id", authMiddleware, submissionController);
router.get("/user/:id", authMiddleware, submissionController);
*/
