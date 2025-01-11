const { Queue } = require("bullmq");
const { Redis } = require("ioredis"); // Import Redis client

const connection = new Redis({
  host: "localhost", // Replace with your Redis host
  port: 6379, // Default Redis port, change if needed
  maxRetriesPerRequest: null, // Required for BullMQ
});

const evaluation = new Queue("evaluation");
async function produce(submissionData) {
  const res = await evaluation.add("my-job", submissionData, {
    removeOnComplete: true,
  });
  console.log("Job added to queue", res.id);
}
module.exports = { produce };
