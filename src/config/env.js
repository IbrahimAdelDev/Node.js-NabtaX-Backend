require('dotenv').config();

module.exports = {
  PORT: process.env.PORT,
  FRONTEND_URL: process.env.FRONTEND_URL,
  DATABASE_URL: process.env.DATABASE_URL,
  JWT_SECRET: process.env.JWT_SECRET,
};
