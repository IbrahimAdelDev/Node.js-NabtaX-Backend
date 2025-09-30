const { logger } = require('../config/logger');
const User = require('../models/User');

exports.getAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    logger.error('❌ Error fetching users:', error);
    throw new Error('Error fetching users');
  }
};
