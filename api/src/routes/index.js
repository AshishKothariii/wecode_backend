const express = require("express");
const router = express.Router();
const userRoutes = require("./userRoutes");
const problemRoutes = require("./problemRoutes");
const submissionRoutes = require("./submissionRoutes");
const counterRoutes = require("./counterRoutes");
const rateLimit = require("../middleware/rateLimmiter");
router.use("/user", userRoutes);
router.use("/problem", problemRoutes);
router.use("/counter", counterRoutes);

router.use("/submission", submissionRoutes);
router.use("/", rateLimit.authLimiter, async (req, res) => {
  try {
    // Your logic goes here, for example:
    res.send("Hello, world!");
  } catch (error) {
    // Handle any errors that occur during the execution of the route
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});
module.exports = router;
