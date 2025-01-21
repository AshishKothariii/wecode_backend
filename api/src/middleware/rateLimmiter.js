const rateLimit = require("express-rate-limit");
const { RateLimiterMemory } = require("rate-limiter-flexible");
const rateLimiter = new RateLimiterMemory({
  points: 30,
  duration: 60,
  keyPrefix: "token",
});

const authLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res, next, options) => {
    try {
      res.status(429).json({
        success: false,
        error: "Too Many Requests",
        message:
          "You have exceeded the maximum number of allowed requests. Please try again later.",
      });
    } catch (err) {
      next(err);
    }
  },
});
const tokenLimiter = (req, res, next) => {
  try {
    const token = req.cookies["authToken"];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authorization token is missing.",
      });
    }

    rateLimiter
      .consume(token)
      .then(() => {
        next();
      })
      .catch(() => {
        res.status(429).json({
          success: false,
          message: "Too many requests. Please try again later.",
        });
      });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  tokenLimiter,
  authLimiter,
};
