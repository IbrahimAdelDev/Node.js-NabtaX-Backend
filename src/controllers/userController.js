const userService = require('../services/userService');
const { successResponse } = require('../utils/apiResponse');
const { logger } = require('../config/logger');

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(successResponse(users));
  } catch (error) {
    logger.error('❌ Error fetching users:', error);
    next(error);
  }
};
