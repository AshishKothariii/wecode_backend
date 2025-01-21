const express = require("express");
const router = express.Router();
const problemController = require("../controllers/problemController");
const authMiddleware = require("../middleware/authMiddleware");
const rateLimit = require("../middleware/rateLimmiter");

router.get(
  "/",
  authMiddleware,
  rateLimit.tokenLimiter,
  problemController.getProblems
);
router.get(
  "/:id",
  authMiddleware,
  rateLimit.tokenLimiter,
  problemController.getProblemById
);
module.exports = router;
