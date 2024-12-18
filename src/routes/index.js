const express = require("express");
const router = express.Router();
const getProfile = require("../utils/getProfile");
// Import individual route files
const userRoutes = require("./userRoutes");
const problemRoutes = require("./problemRoutes");
const submissionRoutes = require("./submissionRoutes");

router.use("/user", userRoutes);
router.use("/problem", problemRoutes);
/*
router.use("/submission", submissionRoutes);
*/
router.get("/", (req, res) => {
  getProfile.generatePresignedGetUrl();
});
module.exports = router;
