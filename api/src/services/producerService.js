const { SQSClient, SendMessageCommand } = require("@aws-sdk/client-sqs");
require("dotenv").config({ path: ".././.env" });

const awsConfig = {
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
};

const sqsClient = new SQSClient(awsConfig);
async function produce(submissionData) {
  const message = {
    MessageBody: JSON.stringify(submissionData),
    QueueUrl: process.env.QUEUE_URL,
  };

  try {
    const command = new SendMessageCommand(message);
    const data = await sqsClient.send(command);
    console.log("Message sent successfully:", data.MessageId);
  } catch (error) {
    console.error("Error sending message:", error);
  }
}

module.exports = { produce };
