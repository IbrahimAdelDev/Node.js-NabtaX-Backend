// services/deviceService.js
const Device = require('../models/Device');

// 🟢 Get all devices
async function getAllDevices() {
  return await Device.find()
    .populate('userId', 'username email')
    .populate('productId', 'name model code')
    .populate('sensors', 'type unit')
    .populate('actuators', 'name type state');
}

// 🟢 Get device by ID
async function getDeviceById(id) {
  const device = await Device.findById(id)
    .populate('userId', 'username email')
    .populate('productId', 'name model code')
    .populate('sensors', 'type unit')
    .populate('actuators', 'name type state');

  if (!device) {
    const error = new Error('Device not found');
    error.statusCode = 404;
    throw error;
  }

  return device;
}

// 🟢 Create new device
async function createDevice(data) {
  const device = new Device(data);
  return await device.save();
}

// 🟢 Update existing device
async function updateDevice(id, updates) {
  const device = await Device.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true,
  });

  if (!device) {
    const error = new Error('Device not found');
    error.statusCode = 404;
    throw error;
  }

  return device;
}

// 🟢 Delete device
async function deleteDevice(id) {
  const device = await Device.findByIdAndDelete(id);

  if (!device) {
    const error = new Error('Device not found');
    error.statusCode = 404;
    throw error;
  }

  return device;
}

module.exports = {
  getAllDevices,
  getDeviceById,
  createDevice,
  updateDevice,
  deleteDevice,
};
