// middleware/errorHandler.js

module.exports = (err, req, res, next) => {
  // Log the error for debugging
  console.error(err.stack);

  // Send a response with a proper HTTP status code and message
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "development" ? err.stack : null, // Don't expose stack trace in production
  });
};
