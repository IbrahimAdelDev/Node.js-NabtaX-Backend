const app = require('./app');
const connectDB = require('./config/db');
const { logger} = require('./config/logger');

const { PORT } = require('./config/env');

(async () => {
  try {
    await connectDB();
    await app.listen(PORT);
    logger.info(`🚀 Server running on port ${PORT}`);
  } catch (error) {
    logger.error('❌ Error starting server:', error);
  }
})();
