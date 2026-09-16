const rateLimit = require('express-rate-limit');

// 1. General Global API Rate Limiter
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300, // Limit each IP to 300 requests per 15 minutes
  standardHeaders: true, // Return standard RateLimit headers
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again in 15 minutes.',
  },
});

// 2. Strict Authentication & Admin Route Limiter (Stops Brute Force & Credential Stuffing)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: process.env.NODE_ENV === 'production' ? 15 : 200, // Generous limit in dev, strict in prod
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => process.env.NODE_ENV !== 'production' && (req.ip === '127.0.0.1' || req.ip === '::1' || req.ip === '::ffff:127.0.0.1'),
  message: {
    success: false,
    message: 'Too many authentication attempts. For security reasons, this IP is temporarily rate-limited for 15 minutes.',
  },
});

// 3. Form Submissions Limiter (Stops spam bots, mail floods, & database clutter)
const formsLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 20, // Max 20 submissions per hour per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Submission limit reached for this hour. Please contact us directly at nexoralabtechnologies@gmail.com.',
  },
});

// 4. AI & Resume Analysis Limiter (Protects OpenAI/Gemini quotas and server compute)
const aiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 25, // Max 25 AI queries per 15 minutes per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'AI tools rate limit reached. Please wait a few minutes before analyzing another profile.',
  },
});

// 5. Anti-Bot Honeypot Middleware
// Automatically detects and drops spam submissions if hidden honeypot fields (_hp, website_trap, hp_token) are filled
const verifyHoneypot = (req, res, next) => {
  const honeypot = req.body._hp || req.body.website_trap || req.body.hp_token;
  if (honeypot && honeypot.trim().length > 0) {
    console.warn(`[SECURITY ALERT] Spam bot detected and blocked from IP: ${req.ip}`);
    // Return fake success to confuse spam bots without saving junk data
    return res.status(200).json({
      success: true,
      message: 'Inquiry received successfully.',
    });
  }
  next();
};

// 6. XSS & HTML Tag Sanitizer Utility
const sanitizeInput = (str) => {
  if (typeof str !== 'string') return str;
  return str
    .replace(/[<>]/g, '') // Strip < and > tags
    .trim();
};

module.exports = {
  globalLimiter,
  authLimiter,
  formsLimiter,
  aiLimiter,
  verifyHoneypot,
  sanitizeInput,
};
