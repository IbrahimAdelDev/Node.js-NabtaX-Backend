// routes/alertRoutes.js
const express = require('express');
const router = express.Router();
const alertController = require('../controllers/alertController');

// POST → إنشاء تنبيه جديد
router.post('/', alertController.createAlert);

// GET → جلب التنبيهات (بفلترة اختيارية)
router.get('/', alertController.getAlerts);

// PUT → تحديث تنبيه (مثلاً mark as resolved)
router.put('/:id', alertController.updateAlert);

// DELETE → حذف تنبيه
router.delete('/:id', alertController.deleteAlert);

module.exports = router;
