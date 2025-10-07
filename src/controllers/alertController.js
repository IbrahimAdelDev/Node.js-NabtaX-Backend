// controllers/alertController.js
const alertService = require('../services/alertService');

// 🟢 إنشاء تنبيه جديد
const createAlert = async (req, res) => {
  try {
    const alert = await alertService.createAlert(req.body);
    res.status(201).json({ success: true, data: alert });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// 🔵 جلب التنبيهات
const getAlerts = async (req, res) => {
  try {
    const filters = {
      deviceId: req.query.deviceId,
      severity: req.query.severity,
      resolved: req.query.resolved,
      limit: req.query.limit
    };

    const alerts = await alertService.getAlerts(filters);
    res.status(200).json({ success: true, count: alerts.length, data: alerts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// 🟠 تحديث تنبيه
const updateAlert = async (req, res) => {
  try {
    const alert = await alertService.updateAlert(req.params.id, req.body);
    res.status(200).json({ success: true, data: alert });
  } catch (err) {
    console.error(err);
    res.status(404).json({ success: false, message: err.message });
  }
};

// 🔴 حذف تنبيه
const deleteAlert = async (req, res) => {
  try {
    const alert = await alertService.deleteAlert(req.params.id);
    res.status(200).json({ success: true, message: 'Alert deleted', data: alert });
  } catch (err) {
    console.error(err);
    res.status(404).json({ success: false, message: err.message });
  }
};

module.exports = {
  createAlert,
  getAlerts,
  updateAlert,
  deleteAlert
};
