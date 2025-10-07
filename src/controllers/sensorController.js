// controllers/sensorController.js
const SensorService = require('../services/sensorService');

// 🟢 Get all
exports.getAllSensors = async (req, res, next) => {
  try {
    const sensors = await SensorService.getAllSensors();
    res.status(200).json(sensors);
  } catch (error) {
    next(error);
  }
};

// 🟢 Get by ID
exports.getSensorById = async (req, res, next) => {
  try {
    const sensor = await SensorService.getSensorById(req.params.id);
    res.status(200).json(sensor);
  } catch (error) {
    next(error);
  }
};

// 🟢 Create
exports.createSensor = async (req, res, next) => {
  try {
    const sensor = await SensorService.createSensor(req.body);
    res.status(201).json(sensor);
  } catch (error) {
    next(error);
  }
};

// 🟢 Update
exports.updateSensor = async (req, res, next) => {
  try {
    const sensor = await SensorService.updateSensor(req.params.id, req.body);
    res.status(200).json(sensor);
  } catch (error) {
    next(error);
  }
};

// 🟢 Delete
exports.deleteSensor = async (req, res, next) => {
  try {
    const sensor = await SensorService.deleteSensor(req.params.id);
    res.status(200).json({ message: 'Sensor deleted', sensor });
  } catch (error) {
    next(error);
  }
};
