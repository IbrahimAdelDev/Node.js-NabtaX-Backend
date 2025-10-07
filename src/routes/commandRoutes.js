// routes/commandRoutes.js
const express = require('express');
const router = express.Router();
const commandController = require('../controllers/commandController');

// POST → إنشاء أمر جديد
router.post('/', commandController.createCommand);

// GET → جلب أوامر بفلترة اختيارية
router.get('/', commandController.getCommands);

// PUT → تحديث حالة أمر
router.put('/:id', commandController.updateCommandStatus);

// DELETE → حذف أمر
router.delete('/:id', commandController.deleteCommand);

module.exports = router;
