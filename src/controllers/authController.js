const { validationResult } = require('express-validator');
const authService = require('../services/authService');
const { successResponse, errorResponse } = require('../utils/apiResponse');
const { logger } = require('../config/logger');

exports.register = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errorResponse(errors.array()));
    }

    const { username, name, email, password } = req.body;
    const user = await authService.register({ username, name, email, password });
    return res.status(201).json(successResponse(user));
  } catch (error) {
    // return res.status(500).json(errorResponse(error.message));
    logger.error(`Error occurred during registration: ${error.message}`);
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errorResponse(errors.array()));
    }

    const { email, password } = req.body;
    const deviceUUID = req.headers['x-device-uuid'];
    if (!deviceUUID) {
      return res.status(400).json(errorResponse('Device UUID header (x-device-uuid) is required'));
    }
    const { accessToken, refreshToken, user } = await authService.login({ email, password, deviceUUID });

    return res.status(200).json(successResponse({ accessToken, refreshToken, user }));
  } catch (error) {
    logger.error(`Error occurred during login: ${error.message}`);
    next(error);
  }
};

exports.refresh = async (req, res, next) => {
  try {
    const oldRefreshToken = req.headers['x-refresh-token'];
    const deviceUUID = req.headers['x-device-uuid'];
    if (!deviceUUID || !oldRefreshToken) {
      return res.status(400).json(errorResponse('Device UUID header (x-device-uuid) and Refresh Token header (x-refresh-token) are required'));
    }

    const { accessToken, newRefreshToken } = await authService.refresh(oldRefreshToken, deviceUUID);

    return res.status(200).json(successResponse({ accessToken, newRefreshToken }));
  } catch (error) {
    logger.error(`Error occurred during token refresh: ${error.message}`);
    next(error);
  }
};

exports.logout = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errorResponse(errors.array()));
    }
    const userId = req.user.id;
    const deviceUUID = req.headers['x-device-uuid'];
    if (!deviceUUID) {
      return res.status(400).json(errorResponse('Device UUID header (x-device-uuid) is required'));
    }
    const message = await authService.logout(userId, deviceUUID);
    return res.status(204).json(successResponse(message));
  } catch (error) {
    logger.error(`Error occurred during logout: ${error.message}`);
    next(error);
  }
};
