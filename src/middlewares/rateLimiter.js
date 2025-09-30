const ms = require('ms');
const { logger } = require('../config/logger');
const rateLimit = require('express-rate-limit');
const { RATE_LIMIT_WINDOW_MS, RATE_LIMIT_MAX } = require('../config/env');

const windowMsValue = ms(RATE_LIMIT_WINDOW_MS); // يحول '15m' لرقم

if (!windowMsValue) {
  logger.error(`Invalid RATE_LIMIT_WINDOW_MS value: ${RATE_LIMIT_WINDOW_MS}`);
  throw new Error(`Invalid RATE_LIMIT_WINDOW_MS value: ${RATE_LIMIT_WINDOW_MS}`);
}

const apiLimiter = rateLimit({
  windowMs: windowMsValue,
  max: RATE_LIMIT_MAX,
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many requests, please try again later.',
});

module.exports = apiLimiter;
