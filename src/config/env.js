require('dotenv').config();

module.exports = {
  PORT: process.env.PORT,
  FRONTEND_URL: process.env.FRONTEND_URL,
  DATABASE_URL: process.env.DATABASE_URL,
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  ACCESS_TOKEN_EXPIRES_IN: process.env.ACCESS_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_EXPIRES_IN: process.env.REFRESH_TOKEN_EXPIRES_IN,
  BYCRYPT_SALT_ROUNDS: process.env.BYCRYPT_SALT_ROUNDS,
  RATE_LIMIT_WINDOW_MS: process.env.RATE_LIMIT_WINDOW_MS,
  RATE_LIMIT_MAX: process.env.RATE_LIMIT_MAX,
  MAX_DEVICES: process.env.MAX_DEVICES,
  MQTT_BROKER: process.env.MQTT_BROKER || 'localhost',
  MQTT_PORT: parseInt(process.env.MQTT_PORT) || 1883,
  MQTT_WS_PORT: parseInt(process.env.MQTT_WS_PORT) || 8883,
  MQTT_USERNAME: process.env.MQTT_USERNAME,
  MQTT_PASSWORD: process.env.MQTT_PASSWORD,
  TLS_KEY: process.env.TLS_KEY,
  TLS_CERT: process.env.TLS_CERT,
  WEBSOCKET_PORT: parseInt(process.env.WEBSOCKET_PORT),
};
