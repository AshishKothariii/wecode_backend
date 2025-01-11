const express = require("express");
const router = express.Router();
const {
  getCurrentCounter,
  incrementCounterValue,
} = require("../controllers/counterController");

// GET route to fetch the current counter value
router.get("/", getCurrentCounter);

// POST route to increment the counter
router.post("/increment", incrementCounterValue);

module.exports = router;
