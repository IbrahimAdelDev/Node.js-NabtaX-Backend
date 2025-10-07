// controllers/imageController.js
const imageService = require('../services/imageService');

// 🟢 إنشاء صورة جديدة
const createImage = async (req, res) => {
  try {
    const image = await imageService.createImage(req.body);
    res.status(201).json({ success: true, data: image });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// 🔵 جلب الصور
const getImages = async (req, res) => {
  try {
    const filters = {
      deviceId: req.query.deviceId,
      stageId: req.query.stageId,
      startDate: req.query.startDate,
      endDate: req.query.endDate,
      limit: req.query.limit
    };
    const images = await imageService.getImages(filters);
    res.status(200).json({ success: true, count: images.length, data: images });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// 🟠 حذف صورة واحدة
const deleteImage = async (req, res) => {
  try {
    const image = await imageService.deleteImage(req.params.id);
    res.status(200).json({ success: true, message: 'Image deleted', data: image });
  } catch (err) {
    console.error(err);
    res.status(404).json({ success: false, message: err.message });
  }
};

// 🔴 حذف عدة صور
const deleteManyImages = async (req, res) => {
  try {
    const result = await imageService.deleteManyImages(req.query);
    res.status(200).json({ success: true, deletedCount: result.deletedCount });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  createImage,
  getImages,
  deleteImage,
  deleteManyImages
};
