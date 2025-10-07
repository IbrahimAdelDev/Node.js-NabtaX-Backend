// services/commandService.js
const Command = require('../models/Command');

// 🟢 إنشاء أمر جديد
const createCommand = async (data) => {
  const command = await Command.create(data);
  return command;
};

// 🔵 جلب الأوامر (بفلترة اختيارية)
const getCommands = async (filters) => {
  const query = {};
  if (filters.deviceId) query.deviceId = filters.deviceId;
  if (filters.stageId) query.stageId = filters.stageId;
  if (filters.actuatorId) query.actuatorId = filters.actuatorId;
  if (filters.status) query.status = filters.status;

  const commands = await Command
    .find(query)
    .populate('deviceId stageId actuatorId')
    .sort({ createdAt: -1 })
    .limit(filters.limit ? parseInt(filters.limit) : 100);

  return commands;
};

// 🟠 تحديث حالة الأمر (مثلاً لما الجهاز يرد)
const updateCommandStatus = async (id, status) => {
  const command = await Command.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  );
  if (!command) throw new Error('Command not found');
  return command;
};

// 🔴 حذف أمر (نادر الاستخدام لكن موجود)
const deleteCommand = async (id) => {
  const command = await Command.findByIdAndDelete(id);
  if (!command) throw new Error('Command not found');
  return command;
};

module.exports = {
  createCommand,
  getCommands,
  updateCommandStatus,
  deleteCommand
};
