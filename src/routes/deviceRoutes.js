// routes/deviceRoutes.js
const express = require('express');
const router = express.Router();
const deviceController = require('../controllers/deviceController');

// CRUD routes
router.get('/', deviceController.getAllDevices);
// 🟢 Get Devices By Garden ID
router.get('/garden/:gardenId', deviceController.getDevicesByGardenId);
router.get('/:id', deviceController.getDeviceById);
router.post('/', deviceController.createDevice);
router.put('/:id', deviceController.updateDevice);
router.delete('/:id', deviceController.deleteDevice);

module.exports = router;
