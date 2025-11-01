const JWT = require('jsonwebtoken');
const ms = require('ms');
const {
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET,
  ACCESS_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_EXPIRES_IN,
} = require('../config/env');
const { logger } = require('../config/logger');

const generateAccessToken = (payload) => {
  return JWT.sign(payload,
    JWT_ACCESS_SECRET,
    {
      expiresIn: ms(ACCESS_TOKEN_EXPIRES_IN),
    }
  );
}

const generateRefreshToken = (payload) => {
  return JWT.sign(payload,
    JWT_REFRESH_SECRET,
    {
      expiresIn: ms(REFRESH_TOKEN_EXPIRES_IN),
    }
  );
}

const verifyAccessToken = (token) => {
  try {
    return JWT.verify(token, JWT_ACCESS_SECRET);
  } catch (error) {
    logger.error('Error verifying access token:', error);
    return null;
  }
}

const verifyRefreshToken = (token) => {
  try {
    return JWT.verify(token, JWT_REFRESH_SECRET);
  } catch (error) {
    logger.error('Error verifying refresh token:', error);
    return null;
  }
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
