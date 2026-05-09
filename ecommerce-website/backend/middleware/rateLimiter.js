const rateLimit = require("express-rate-limit");

exports.authLimiter = rateLimit({

  windowMs: 15 * 60 * 1000,

  max: 5,

  standardHeaders: true,

  legacyHeaders: false,

  handler: (req, res) => {

    return res.status(429).json({
      message:
        "Too many login attempts from this device/network. Please try again in 15 minutes.",
    });

  },

});