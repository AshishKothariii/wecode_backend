const {
  getCounterValue,
  incrementCounter,
} = require("../services/counterService"); // Import the service

// Controller function to fetch the current counter value
async function getCurrentCounter(req, res) {
  try {
    const counterValue = await getCounterValue();
    res.status(200).json({ counter: counterValue });
  } catch (error) {
    res.status(500).json({
      message: "Failed to get counter value",
      error: error.message,
    });
  }
}

// Controller function to increment the counter
async function incrementCounterValue(req, res) {
  try {
    const updatedCounter = await incrementCounter();
    res.status(200).json({ counter: updatedCounter });
  } catch (error) {
    res.status(500).json({
      message: "Failed to increment counter",
      error: error.message,
    });
    throw err;
  }
}

module.exports = {
  getCurrentCounter,
  incrementCounterValue,
};
