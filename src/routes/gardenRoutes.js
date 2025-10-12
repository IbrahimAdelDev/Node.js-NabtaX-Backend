const express = require('express');
const router = express.Router();
const gardenController = require('../controllers/gardenController');

// Create
router.post('/', gardenController.createGarden);

// Read all
router.get('/', gardenController.getAllGardens);

// Read one
router.get('/:id', gardenController.getGardenById);

// Update
router.put('/:id', gardenController.updateGarden);

// Delete
router.delete('/:id', gardenController.deleteGarden);

module.exports = router;
