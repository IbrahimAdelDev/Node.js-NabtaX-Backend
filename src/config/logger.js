const winston = require('winston');

const logger = winston.createLogger({
  // level: 'info',
  level: 'silly',
  format: winston.format.simple(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

module.exports = { logger };