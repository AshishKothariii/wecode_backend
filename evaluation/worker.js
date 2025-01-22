const AWS = require("aws-sdk");
const execute = require("./exceute");
require("dotenv").config({ path: "./.env" });

AWS.config.update({
  accessKeyId: process.env.ACCESS,
  secretAccessKey: process.env.SECRET_ACCESS,
  region: "ap-south-1",
});

const sqs = new AWS.SQS();

const queueUrl = process.env.QUEUE_URL;
const params = {
  QueueUrl: queueUrl,
  MaxNumberOfMessages: 1,
  WaitTimeSeconds: 1,
};
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
async function pollQueue() {
  console.log("Polling for messages...");

  try {
    const data = await sqs.receiveMessage(params).promise();

    if (data.Messages && data.Messages.length > 0) {
      const message = data.Messages[0];
      console.log("Message received:", message);
      console.log("Message Body:", message.Body);
      try {
        const messageBody = JSON.parse(message.Body);
        console.log("Parsed Message Body:", messageBody);
        if (messageBody.language === "cpp") {
          await execute.executecpp(messageBody);
        } else if (messageBody.language === "python") {
          await execute.executepy(messageBody);
        }

        const deleteParams = {
          QueueUrl: queueUrl,
          ReceiptHandle: message.ReceiptHandle,
        };

        await sqs.deleteMessage(deleteParams).promise();
        console.log("Message deleted successfully.");
      } catch (processError) {
        console.error("Error processing message:", processError);
      }
    } else {
      console.log("No messages available, retrying...");
      await delay(1 * 30 * 1000);
    }
  } catch (receiveError) {
    console.error("Error receiving message:", receiveError);
  }

  pollQueue();
}

pollQueue();
