// routes/imageRoutes.js
const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageController');

// POST → إضافة صورة جديدة
router.post('/', imageController.createImage);

// GET → جلب الصور مع فلترة (deviceId, stageId, dates)
router.get('/', imageController.getImages);

// DELETE → حذف صورة واحدة
router.delete('/:id', imageController.deleteImage);

// DELETE MANY → حذف مجموعة صور (deviceId أو stageId)
router.delete('/', imageController.deleteManyImages);

module.exports = router;
