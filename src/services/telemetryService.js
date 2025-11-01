// services/telemetryService.js
const { default: mongoose } = require('mongoose');
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

// get last telemetries for a device
const getLastTelemetriesForDevice = async (deviceId) => {
  console.log(deviceId);
  deviceId = new mongoose.Types.ObjectId(deviceId);
  const telemetries = await Telemetry.aggregate([
    { $match: { 'metadata.deviceId': deviceId } },

    // ترتيب حسب stageId ثم type ثم timestamp نزولي
    { $sort: { stageId: 1, type: 1, timestamp: -1 } },

    // خذ آخر reading لكل stage + type
    {
      $group: {
        _id: { stageId: '$stageId', type: '$type' },
        value: { $first: '$value' },
        unit: { $first: '$unit' },
        sensorId: { $first: '$sensorId' },
        timestamp: { $first: '$timestamp' },
        taked_at: { $first: '$taked_at' },
        clientId: { $first: '$metadata.clientId' },
        deviceId: { $first: '$metadata.deviceId' }
      }
    },

    // جمع كل readings حسب stage
    {
      $group: {
        _id: '$_id.stageId',
        readings: { $push: {
          type: '$_id.type',
          value: '$value',
          unit: '$unit',
          sensorId: '$sensorId',
          timestamp: '$timestamp',
          taked_at: '$taked_at'
        }}
      }
    },

    // شكل نهائي
    { $project: { stageId: '$_id', readings: 1, _id: 0 } },
    { $sort: { stageId: 1 } }
  ]);
  console.log(telemetries);

  return telemetries;
};



module.exports = {
  createTelemetry,
  getTelemetries,
  getLastTelemetriesForDevice,
};
