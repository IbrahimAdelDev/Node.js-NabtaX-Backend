const mongoose = require('mongoose');
const { logger } = require('../config/logger');
const ensureTelemetryTimeSeriesCollection = require('../models/ensureTelemetryTS');
const { DATABASE_URL } = require('./env');

const connectDB = async () => {
  try {
    await mongoose.connect(DATABASE_URL);
    logger.info('✅ MongoDB connected successfully');

    // تأكد من وجود time-series collection
    await ensureTelemetryTimeSeriesCollection();
    logger.info('✅ Time-series collection ensured');
  } catch (err) {
    logger.error('❌ Error ensuring time-series collection:', err);
    process.exit(1);
  }
};

module.exports = connectDB;