// Import necessary AWS SDK v3 clients and utilities
const { SQSClient, SendMessageCommand } = require("@aws-sdk/client-sqs");
require("dotenv").config({ path: ".././.env" }); // Make sure this is at the top

// Manually define AWS credentials (make sure to use your actual credentials)
const awsConfig = {
  region: "ap-south-1", // Your AWS region (e.g., 'ap-south-1')
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY, // Replace with your AWS access key ID
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // Replace with your AWS secret access key
  },
  // Optional: Specify the endpoint if necessary (usually needed for local testing)
  // endpoint: "https://sqs.ap-south-1.amazonaws.com" // Uncomment if needed
};

// Create an SQS client with the manually specified credentials
const sqsClient = new SQSClient(awsConfig);
async function produce(submissionData) {
  // Define the message payload
  const message = {
    MessageBody: JSON.stringify({ key: "value" }), // The message content
    QueueUrl: process.env.QUEUE_URL, // The URL of your SQS queue
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
