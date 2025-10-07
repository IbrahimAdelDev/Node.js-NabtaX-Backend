// 📁 routes/subscriptionRoutes.js
const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscriptionController');

// 🟢 CRUD routes
router.get('/', subscriptionController.getAll);
router.get('/:id', subscriptionController.getById);
router.post('/', subscriptionController.create);
router.put('/:id', subscriptionController.update);
router.delete('/:id', subscriptionController.remove);

module.exports = router;
