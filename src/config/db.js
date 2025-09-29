const mongoose = require('mongoose');

const { logger } = require('../config/logger');
const Telemetry = require('../models/Telemetry');

const { DATABASE_URL } = require('./env');

const connectDB = async () => {
  try {
    await mongoose.connect(DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger.info('✅ MongoDB connected successfully');
    
    // Ensure time-series collection for Telemetry
    await Telemetry.createTimeSeriesCollection();
    logger.info('✅ Time-series collection ensured');
  } catch (err) {
    logger.error('❌ Error ensuring time-series collection:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;