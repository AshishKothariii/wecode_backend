// presignedGetUrl.js
require("dotenv").config({ path: ".././.env" }); // Make sure this is at the top
const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
