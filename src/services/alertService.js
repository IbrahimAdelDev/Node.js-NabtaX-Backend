// services/alertService.js
const Alert = require('../models/Alert');

// 🟢 إنشاء تنبيه جديد
const createAlert = async (data) => {
  const alert = await Alert.create(data);
  return alert;
};

// 🔵 جلب التنبيهات مع فلترة اختيارية
const getAlerts = async (filters) => {
  const query = {};

  if (filters.deviceId) query.deviceId = filters.deviceId;
  if (filters.severity) query.severity = filters.severity;
  if (filters.resolved !== undefined) query.resolved = filters.resolved === 'true';

  const alerts = await Alert
    .find(query)
    .populate('deviceId')
    .sort({ createdAt: -1 })
    .limit(filters.limit ? parseInt(filters.limit) : 100);

  return alerts;
};

// 🟠 تحديث حالة التنبيه (مثل mark as resolved)
const updateAlert = async (id, updates) => {
  const alert = await Alert.findByIdAndUpdate(id, updates, { new: true });
  if (!alert) throw new Error('Alert not found');
  return alert;
};

// 🔴 حذف تنبيه
const deleteAlert = async (id) => {
  const alert = await Alert.findByIdAndDelete(id);
  if (!alert) throw new Error('Alert not found');
  return alert;
};

module.exports = {
  createAlert,
  getAlerts,
  updateAlert,
  deleteAlert
};
