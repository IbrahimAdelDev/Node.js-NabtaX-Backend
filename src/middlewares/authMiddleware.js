const { verifyAccessToken } = require('../utils/jwt');
const { logger } = require('../config/logger');

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      logger.error('Authorization header is missing');
      return res.status(401).json({ message: 'Authorization header is missing' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      logger.error('Access token is missing');
      return res.status(401).json({ message: 'Access token is missing' });
    }

    const payload = verifyAccessToken(token);
    req.user = payload;
    next();
  } catch (error) {
    logger.error(`Error occurred during token verification: ${error.message}`);
    return res.status(403).json({ message: 'Invalid access token' });
  }
};

module.exports = {
  authMiddleware,
}