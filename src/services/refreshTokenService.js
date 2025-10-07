// services/refreshTokenService.js
const RefreshToken = require('../models/RefreshToken');

// 🟢 إنشاء أو تحديث توكن بناءً على userId + deviceUUID
const createOrUpdateToken = async (data) => {
  const { userId, deviceUUID, token, expires } = data;

  const refreshToken = await RefreshToken.findOneAndUpdate(
    { userId, deviceUUID },
    { token, expires },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );

  return refreshToken;
};

// 🔵 جلب جميع التوكنات
const getAllTokens = async () => {
  return await RefreshToken.find().populate('userId');
};

// 🟣 جلب توكن واحد
const getTokenById = async (id) => {
  const token = await RefreshToken.findById(id).populate('userId');
  if (!token) throw new Error('Token not found');
  return token;
};

// 🟠 حذف توكن واحد
const deleteToken = async (id) => {
  const token = await RefreshToken.findByIdAndDelete(id);
  if (!token) throw new Error('Token not found');
  return token;
};

// 🔴 حذف جميع توكنات مستخدم أو جهاز
const deleteManyTokens = async (filters) => {
  const query = {};
  if (filters.userId) query.userId = filters.userId;
  if (filters.deviceUUID) query.deviceUUID = filters.deviceUUID;

  const result = await RefreshToken.deleteMany(query);
  return result;
};

module.exports = {
  createOrUpdateToken,
  getAllTokens,
  getTokenById,
  deleteToken,
  deleteManyTokens
};
