const express = require("express");
const router = express.Router();
const problemController = require("../controllers/problemController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, problemController.createProblem);
router.get("/", authMiddleware, problemController.getProblems);
router.get("/:id", authMiddleware, problemController.getProblemById);
module.exports = router;
