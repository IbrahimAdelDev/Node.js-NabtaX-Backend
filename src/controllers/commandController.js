// controllers/commandController.js
const commandService = require('../services/commandService');

// 🟢 إنشاء أمر جديد
const createCommand = async (req, res) => {
  try {
    const command = await commandService.createCommand(req.body);
    res.status(201).json({ success: true, data: command });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// 🔵 جلب الأوامر
const getCommands = async (req, res) => {
  try {
    const filters = {
      deviceId: req.query.deviceId,
      stageId: req.query.stageId,
      actuatorId: req.query.actuatorId,
      status: req.query.status,
      limit: req.query.limit
    };

    const commands = await commandService.getCommands(filters);
    res.status(200).json({ success: true, count: commands.length, data: commands });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// 🟠 تحديث حالة أمر
const updateCommandStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const command = await commandService.updateCommandStatus(req.params.id, status);
    res.status(200).json({ success: true, data: command });
  } catch (err) {
    console.error(err);
    res.status(404).json({ success: false, message: err.message });
  }
};

// 🔴 حذف أمر
const deleteCommand = async (req, res) => {
  try {
    const command = await commandService.deleteCommand(req.params.id);
    res.status(200).json({ success: true, message: 'Command deleted', data: command });
  } catch (err) {
    console.error(err);
    res.status(404).json({ success: false, message: err.message });
  }
};

module.exports = {
  createCommand,
  getCommands,
  updateCommandStatus,
  deleteCommand
};
