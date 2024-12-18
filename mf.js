require("dotenv").config(); // Load environment variables from the .env file

// Debugging step: Check if the .env file is loaded correctly
console.log("Environment Variables:", process.env);
console.log(process.env.AWS_ACCESS_KEY);
