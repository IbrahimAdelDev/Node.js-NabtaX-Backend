// controllers/refreshTokenController.js
const refreshTokenService = require('../services/refreshTokenService');

// 🟢 إنشاء أو تحديث توكن
const createOrUpdateToken = async (req, res) => {
  try {
    const token = await refreshTokenService.createOrUpdateToken(req.body);
    res.status(201).json({ success: true, data: token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// 🔵 جلب جميع التوكنات
const getAllTokens = async (req, res) => {
  try {
    const tokens = await refreshTokenService.getAllTokens();
    res.status(200).json({ success: true, count: tokens.length, data: tokens });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// 🟣 جلب توكن واحد
const getTokenById = async (req, res) => {
  try {
    const token = await refreshTokenService.getTokenById(req.params.id);
    res.status(200).json({ success: true, data: token });
  } catch (err) {
    console.error(err);
    res.status(404).json({ success: false, message: err.message });
  }
};

// 🟠 حذف توكن واحد
const deleteToken = async (req, res) => {
  try {
    const token = await refreshTokenService.deleteToken(req.params.id);
    res.status(200).json({ success: true, message: 'Token deleted', data: token });
  } catch (err) {
    console.error(err);
    res.status(404).json({ success: false, message: err.message });
  }
};

// 🔴 حذف مجموعة توكنات
const deleteManyTokens = async (req, res) => {
  try {
    const result = await refreshTokenService.deleteManyTokens(req.query);
    res.status(200).json({ success: true, deletedCount: result.deletedCount });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  createOrUpdateToken,
  getAllTokens,
  getTokenById,
  deleteToken,
  deleteManyTokens
};
