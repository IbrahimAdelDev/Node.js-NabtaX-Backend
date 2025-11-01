// routes/sensorRoutes.js
const express = require('express');
const router = express.Router();
const sensorController = require('../controllers/sensorController');

// CRUD routes
router.get('/', sensorController.getAllSensors);
router.get('/:id', sensorController.getSensorById);
router.post('/', sensorController.createSensor);
router.put('/:id', sensorController.updateSensor);
router.delete('/:id', sensorController.deleteSensor);

// 🟢 Get Sensors By Device ID
router.get('/device/:deviceId', sensorController.getSensorsByDeviceId);

// 🟢 Get Sensors By Stage ID
router.get('/stage/:stageId', sensorController.getSensorsByStageId);

module.exports = router;
