// middleware/multer.js
const multer = require("multer");

// Set up Multer to store files in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

module.exports = upload.single("file"); // Accepts a single file named 'file'
