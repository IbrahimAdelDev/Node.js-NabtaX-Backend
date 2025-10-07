// routes/refreshTokenRoutes.js
const express = require('express');
const router = express.Router();
const refreshTokenController = require('../controllers/refreshTokenController');

// POST → إنشاء أو تحديث توكن
router.post('/', refreshTokenController.createOrUpdateToken);

// GET → جميع التوكنات
router.get('/', refreshTokenController.getAllTokens);

// GET → توكن معين
router.get('/:id', refreshTokenController.getTokenById);

// DELETE → حذف توكن واحد
router.delete('/:id', refreshTokenController.deleteToken);

// DELETE MANY → حذف توكنات حسب userId أو deviceUUID
router.delete('/', refreshTokenController.deleteManyTokens);

module.exports = router;
