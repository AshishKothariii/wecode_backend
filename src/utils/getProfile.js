// presignedGetUrl.js
require("dotenv").config({ path: ".././.env" }); // Make sure this is at the top
const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const s3Client = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});
async function generatePresignedGetUrl(bucketName, key) {
  try {
    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: key, // The file path in the bucket
    });

    // Generate a presigned URL for GET with expiration
    const presignedUrl = await getSignedUrl(s3Client, command, {
      expiresIn: 3600,
    }); // URL valid for 1 hour
    return presignedUrl;
  } catch (error) {
    throw error;
  }
}

// Example Usage
module.exports = { generatePresignedGetUrl };
