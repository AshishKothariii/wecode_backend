const express = require("express");
const router = express.Router();
const userRoutes = require("./userRoutes");
const problemRoutes = require("./problemRoutes");
const submissionRoutes = require("./submissionRoutes");
const rateLimit = require("../middleware/rateLimmiter");
router.use("/user", userRoutes);
router.use("/problem", problemRoutes);

router.use("/submission", submissionRoutes);
router.use("/", rateLimit.authLimiter, async (req, res) => {
  try {
    res.send("Hello, world!");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});
module.exports = router;
