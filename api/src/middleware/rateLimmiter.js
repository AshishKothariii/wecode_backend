const rateLimit = require("express-rate-limit");
const { RateLimiterMemory } = require("rate-limiter-flexible");
const rateLimiter = new RateLimiterMemory({
  points: 30, // 100 requests
  duration: 60, // Per 60 seconds
  keyPrefix: "token", // Use token as the unique identifier
});

// Define the rate limiter with a custom error handler
const authLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute window
  max: 10, // Limit each IP to 20 requests per windowMs
  standardHeaders: true, // Include rate limit info in the response headers
  legacyHeaders: false, // Disable deprecated headers
  handler: (req, res, next, options) => {
    try {
      // Custom error response
      res.status(429).json({
        success: false,
        error: "Too Many Requests",
        message:
          "You have exceeded the maximum number of allowed requests. Please try again later.",
      });
    } catch (err) {
      // Catch unexpected errors and pass them to the global error handler
      next(err);
    }
  },
});
const tokenLimiter = (req, res, next) => {
  try {
    // Get the token from the 'authToken' cookie
    const token = req.cookies["authToken"];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authorization token is missing.",
      });
    }

    // Consume a point for the token
    rateLimiter
      .consume(token)
      .then(() => {
        next(); // Allow the request to proceed
      })
      .catch(() => {
        // Handle rate limit exceeded
        res.status(429).json({
          success: false,
          message: "Too many requests. Please try again later.",
        });
      });
  } catch (err) {
    next(err); // Pass any unexpected errors to the global error handler
  }
};

module.exports = {
  tokenLimiter,
  authLimiter,
};
