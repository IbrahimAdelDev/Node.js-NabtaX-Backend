const { logger } = require('../config/logger');

const errorHandler = (err, req, res, next) => {
  logger.error(`Error: ${err.message} - Stack: ${err.stack}`);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Something went wrong!';

  res.status(statusCode).json({
    success: false,
    message,
    // useful for debugging (ممكن تخفيه في production)
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

module.exports = errorHandler;
