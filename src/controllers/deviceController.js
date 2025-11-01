// controllers/deviceController.js
const DeviceService = require('../services/deviceService');

// 🟢 Get all
exports.getAllDevices = async (req, res, next) => {
  try {
    const devices = await DeviceService.getAllDevices();
    res.status(200).json(devices);
  } catch (error) {
    next(error);
  }
};

// 🟢 Get by ID
exports.getDeviceById = async (req, res, next) => {
  try {
    const device = await DeviceService.getDeviceById(req.params.id);
    res.status(200).json(device);
  } catch (error) {
    next(error);
  }
};

// 🟢 Create
exports.createDevice = async (req, res, next) => {
  try {
    const device = await DeviceService.createDevice(req.body);
    res.status(201).json(device);
  } catch (error) {
    next(error);
  }
};

// 🟢 Update
exports.updateDevice = async (req, res, next) => {
  try {
    const device = await DeviceService.updateDevice(req.params.id, req.body);
    res.status(200).json(device);
  } catch (error) {
    next(error);
  }
};

// 🟢 Delete
exports.deleteDevice = async (req, res, next) => {
  try {
    const device = await DeviceService.deleteDevice(req.params.id);
    res.status(200).json({ message: 'Device deleted successfully', device });
  } catch (error) {
    next(error);
  }
};

// 🟢 Get Devices By Garden ID
exports.getDevicesByGardenId = async (req, res, next) => {
  try {
    const devices = await DeviceService.getDevicesByGardenId(req.params.gardenId);
    res.status(200).json(devices);
  } catch (error) {
    next(error);
  }
};
