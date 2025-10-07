// services/telemetryService.js
const Telemetry = require('../models/Telemetry');

/**
 * إنشاء قراءة جديدة (Telemetry record)
 */
const createTelemetry = async (data) => {
  const telemetry = await Telemetry.create(data);
  return telemetry;
};

/**
 * جلب القراءات بناءً على فلترة (deviceId / sensorId / stageId / range زمني)
 */
const getTelemetries = async (filters) => {
  const query = {};

  if (filters.deviceId) query['metadata.deviceId'] = filters.deviceId;
  if (filters.sensorId) query['metadata.sensorId'] = filters.sensorId;
  if (filters.stageId) query['metadata.stageId'] = filters.stageId;

  if (filters.from || filters.to) {
    query.timestamp = {};
    if (filters.from) query.timestamp.$gte = new Date(filters.from);
    if (filters.to) query.timestamp.$lte = new Date(filters.to);
  }

  const telemetries = await Telemetry
    .find(query)
    .sort({ timestamp: -1 })
    .limit(filters.limit ? parseInt(filters.limit) : 500); // limit افتراضي 500

  return telemetries;
};

module.exports = {
  createTelemetry,
  getTelemetries,
};
