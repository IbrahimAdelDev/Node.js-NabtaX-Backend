// routes/telemetryRoutes.js
const express = require('express');
const router = express.Router();
const telemetryController = require('../controllers/telemetryController');

// @route   POST /api/telemetries
// @desc    إنشاء قراءة جديدة
router.post('/', telemetryController.createTelemetry);

// @route   GET /api/telemetries
// @desc    عرض كل القراءات أو حسب فلترة
router.get('/', telemetryController.getTelemetries);

module.exports = router;
