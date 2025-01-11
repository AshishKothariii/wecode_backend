const express = require("express");
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/signup", userController.createUser);
router.post("/login", userController.loginUser);
router.get("/:id", authMiddleware, userController.getProfile);

module.exports = router;
