const Counter = require("../models/counterModel"); // Import Counter model

// Get the current counter value or initialize if not found
async function getCounterValue() {
  try {
    const counter = await Counter.findOne({
      name: "global_submission_counter",
    });
    if (counter) {
      return counter.value;
    } else {
      // Initialize counter if not found
      const newCounter = new Counter({
        name: "global_submission_counter",
        value: 0,
      });
      await newCounter.save();
      return 0; // Return the initialized value
    }
  } catch (err) {
    throw err;
  }
}

// Increment the global counter atomically and return the new value
async function incrementCounter() {
  try {
    const counter = await Counter.findOneAndUpdate(
      { name: "global_submission_counter" },
      { $inc: { value: 1 } }, // Increment the counter by 1
      { new: true, upsert: true } // Create a new counter if it doesn't exist
    );
    return counter.value; // Return the updated counter value
  } catch (err) {
    throw err;
  }
}

module.exports = {
  getCounterValue,
  incrementCounter,
};
