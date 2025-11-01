const bcrypt = require('bcrypt');
const User = require('../models/User');
const RefreshToken = require('../models/RefreshToken');
const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} = require('../utils/jwt');
const {
  BCRYPT_SALT_ROUNDS,
  REFRESH_TOKEN_EXPIRES_IN,
} = require('../config/env');
const ms = require('ms');
const { logger } = require('../config/logger');
const { MAX_DEVICES } = require('../config/env');

// Register
const register = async ({ username, name, email, password }) => {
  const exists = await User.findOne({ email });
  if (exists) {
    logger.warn('Email already in use');
    throw new Error('Email already in use');
  }

  const hash = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
  const user = await User.create({ username, name, email, hashPassword: hash });
  return { id: user._id, email: user.email, name: user.name, username: user.username };
};

// Login
const login = async ({ email, password, deviceUUID }) => {
  if (!deviceUUID) {
    logger.warn('Device UUID is required');
    throw new Error('Device UUID is required');
  }
  const user = await User.findOne({ email });
  if (!user) {
    logger.warn('Invalid credentials');
    throw new Error('Invalid credentials');
  }

  const valid = await bcrypt.compare(password, user.hashPassword);
  if (!valid) {
    logger.warn('Invalid credentials');
    throw new Error('Invalid credentials');
  }

  const payload = { sub: user._id.toString(), email: user.email, username: user.username, name: user.name, deviceUUID };
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  const refreshExpiry = new Date(Date.now() + ms(REFRESH_TOKEN_EXPIRES_IN));

  const refreshTokenDoc = await RefreshToken.findOneAndUpdate(
    { userId: user._id, deviceUUID },
    { token: refreshToken, expires: refreshExpiry },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  const refreshTokenCount = await RefreshToken.countDocuments({ userId: user._id });
  if (refreshTokenCount > MAX_DEVICES) {
    const oldestToken = await RefreshToken.findOne({ userId: user._id })
      .sort({ createdAt: 1 })
      .limit(refreshTokenCount - MAX_DEVICES);
    if (oldestToken) {
      const tokensToRemove = oldestToken.map(d => d._id);
      await RefreshToken.deleteMany({ _id: { $in: tokensToRemove } });
    }
  }

  return {
    accessToken,
    refreshToken,
    user: { id: user._id, email: user.email, name: user.name, username: user.username, deviceUUID },
  };
};

// Refresh
const refresh = async (oldRefreshToken, deviceUUID) => {
  if (!oldRefreshToken) {
    logger.warn('Refresh token is required');
    throw new Error('Refresh token is required');
  }
  const payload = verifyRefreshToken(oldRefreshToken);
  const user = await User.findById(payload.sub);
  if (!user) throw new Error('User not found');

  const tokenDoc = await RefreshToken.findOne({ token: oldRefreshToken, deviceUUID });
  if (!tokenDoc) {
    logger.warn('Refresh token revoked');
    throw new Error('Refresh token revoked');
  }

  if (tokenDoc?.expires && tokenDoc?.expires < new Date()) {
    await RefreshToken.deleteOne({ _id: tokenDoc._id });
    logger.warn('Refresh token expired, please log in again');
    throw new Error('Refresh token expired, please log in again');
  }

  // Rotate refresh token (generate new + replace old one)
  const newPayload = { sub: user._id.toString(), email: user.email, username: user.username, name: user.name, deviceUUID: payload.deviceUUID };
  const newAccessToken = generateAccessToken(newPayload);
  const newRefreshToken = generateRefreshToken(newPayload);

  console.error('Generated new refresh token during rotation:', newRefreshToken);

  const refreshExpiry = new Date(Date.now() + ms(REFRESH_TOKEN_EXPIRES_IN));
  tokenDoc.token = newRefreshToken;
  tokenDoc.expires = refreshExpiry;
  await tokenDoc.save();

  return {
    accessToken: newAccessToken,
    newRefreshToken: newRefreshToken
  };
};

// Logout
const logout = async (userId, deviceUUID) => {
  if (!userId || !deviceUUID) {
    logger.warn('User ID and Device UUID are required');
    throw new Error('User ID and Device UUID are required');
  }

  await RefreshToken.findOneAndDelete({ userId, deviceUUID });

  return {
    message: 'Logged out successfully'
  };
};

module.exports = { register, login, refresh, logout };
