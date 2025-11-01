const express = require('express');
const router = express.Router();
const gardenController = require('../controllers/gardenController');

// Create
router.post('/', gardenController.createGarden);

// Read all
router.get('/', gardenController.getAllGardens);

// Read by Owner ID
router.get('/owner/:ownerId', gardenController.getGardensByOwnerId);

// Read one
router.get('/:id', gardenController.getGardenById);

// Update
router.put('/:id', gardenController.updateGarden);

// Delete
router.delete('/:id', gardenController.deleteGarden);

router.post('/:id/add-engineer', gardenController.addEngineer);
router.post('/:id/remove-engineer', gardenController.removeEngineer);
router.post('/:id/add-worker', gardenController.addWorker);
router.post('/:id/remove-worker', gardenController.removeWorker);

module.exports = router;
