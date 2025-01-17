const express = require("express");
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const rateLimit = require("../middleware/rateLimmiter");
const router = express.Router();

router.post("/signup", rateLimit.authLimiter, userController.createUser);
router.post("/login", rateLimit.authLimiter, userController.loginUser);
router.get(
  "/:id",
  authMiddleware,
  rateLimit.tokenLimiter,
  userController.getProfile
);

module.exports = router;
