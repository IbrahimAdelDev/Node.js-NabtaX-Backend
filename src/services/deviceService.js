// services/deviceService.js
const Device = require('../models/Device');
const Garden = require('../models/Garden');

// 🟢 Get all devices
async function getAllDevices() {
  return await Device.find()
    .populate('ownerId', 'username email')
    .populate('productId', 'name model code')
    .populate('sensors', 'type unit')
    .populate('actuators', 'name type state')
    .populate('gardenId', 'name location')
    .populate('stages', 'name description startDate endDate');
}

// 🟢 Get device by ID
async function getDeviceById(id) {
  const device = await Device.findById(id)
    .populate('ownerId', 'username email')  
    .populate('productId', 'name model code')
    .populate('sensors', 'type unit')
    .populate('actuators', 'name type state')
    .populate('gardenId', 'name location')
    .populate('stages', 'name description startDate endDate');

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
  defaultDevice = await device.save();

  const garden = await Garden.findById(data.gardenId);
  if (garden) {
    garden.devices.push(defaultDevice._id);
    await garden.save();
  }
  return defaultDevice;
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

// Get Devices By Garden ID
async function getDevicesByGardenId(gardenId) {
  return await Device.find({ gardenId })
    .populate('ownerId', 'username email')
    .populate('productId', 'name model code')
    .populate('sensors', 'type unit')
    .populate('actuators', 'name type state')
    .populate('gardenId', 'name location');
}

module.exports = {
  getAllDevices,
  getDeviceById,
  createDevice,
  updateDevice,
  deleteDevice,
  getDevicesByGardenId,
};
