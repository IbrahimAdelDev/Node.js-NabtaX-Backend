// routes/actuatorRoutes.js
const express = require('express');
const router = express.Router();
const actuatorController = require('../controllers/actuatorController');

// CRUD routes
router.get('/', actuatorController.getAllActuators);
router.get('/:id', actuatorController.getActuatorById);
router.post('/', actuatorController.createActuator);
router.put('/:id', actuatorController.updateActuator);
router.delete('/:id', actuatorController.deleteActuator);

// Specific route to update schedule
router.put('/:id/schedule', actuatorController.updateActuatorSchedule);

module.exports = router;
