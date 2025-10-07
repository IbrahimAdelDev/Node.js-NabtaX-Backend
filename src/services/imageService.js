// services/imageService.js
const Image = require('../models/Image');

// 🟢 إنشاء صورة جديدة
const createImage = async (data) => {
  const image = await Image.create(data);
  return image;
};

// 🔵 جلب الصور مع فلترة اختيارية
const getImages = async (filters) => {
  const query = {};

  if (filters.deviceId) query.deviceId = filters.deviceId;
  if (filters.stageId) query.stageId = filters.stageId;
  if (filters.startDate && filters.endDate) {
    query.ts = {
      $gte: new Date(filters.startDate),
      $lte: new Date(filters.endDate)
    };
  }

  const images = await Image
    .find(query)
    .populate('deviceId stageId')
    .sort({ ts: -1 })
    .limit(filters.limit ? parseInt(filters.limit) : 50);

  return images;
};

// 🟠 حذف صورة
const deleteImage = async (id) => {
  const image = await Image.findByIdAndDelete(id);
  if (!image) throw new Error('Image not found');
  return image;
};

// 🔴 حذف كل الصور لجهاز أو مرحلة معينة (لو احتجت تنظيف الداتا)
const deleteManyImages = async (filters) => {
  const query = {};
  if (filters.deviceId) query.deviceId = filters.deviceId;
  if (filters.stageId) query.stageId = filters.stageId;

  const result = await Image.deleteMany(query);
  return result;
};

module.exports = {
  createImage,
  getImages,
  deleteImage,
  deleteManyImages
};
