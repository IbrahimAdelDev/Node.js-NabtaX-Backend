const app = require('./app');
const { logger} = require('./config/logger');
const { PORT } = require('./config/env');

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});