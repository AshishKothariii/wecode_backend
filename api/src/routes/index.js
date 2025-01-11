const express = require("express");
const router = express.Router();
// Import individual route files
const userRoutes = require("./userRoutes");
const problemRoutes = require("./problemRoutes");
const submissionRoutes = require("./submissionRoutes");
const counterRoutes = require("./counterRoutes");

router.use("/user", userRoutes);
router.use("/problem", problemRoutes);
router.use("/counter", counterRoutes);

router.use("/submission", submissionRoutes);

module.exports = router;
