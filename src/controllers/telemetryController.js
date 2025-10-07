// controllers/telemetryController.js
const telemetryService = require('../services/telemetryService');

/**
 * @desc إنشاء قراءة جديدة
 */
const createTelemetry = async (req, res) => {
  try {
    const telemetry = await telemetryService.createTelemetry(req.body);
    res.status(201).json({ success: true, data: telemetry });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error creating telemetry', error: error.message });
  }
};

/**
 * @desc جلب القراءات بناءً على الفلاتر
 */
const getTelemetries = async (req, res) => {
  try {
    const filters = {
      deviceId: req.query.deviceId,
      sensorId: req.query.sensorId,
      stageId: req.query.stageId,
      from: req.query.from,
      to: req.query.to,
      limit: req.query.limit,
    };

    const data = await telemetryService.getTelemetries(filters);
    res.status(200).json({ success: true, count: data.length, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error fetching telemetries', error: error.message });
  }
};

module.exports = {
  createTelemetry,
  getTelemetries,
};
