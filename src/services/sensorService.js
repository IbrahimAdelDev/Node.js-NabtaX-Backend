// services/sensorService.js
const Sensor = require('../models/Sensor');

// 🟢 Get all sensors
async function getAllSensors() {
  return await Sensor.find()
    .populate('deviceId', 'name _id')
    .populate('stageId', 'name _id');
}

// 🟢 Get sensor by ID
async function getSensorById(id) {
  const sensor = await Sensor.findById(id)
    .populate('deviceId', 'name _id')
    .populate('stageId', 'name _id');

  if (!sensor) {
    const error = new Error('Sensor not found');
    error.statusCode = 404;
    throw error;
  }
  return sensor;
}

// 🟢 Create sensor
async function createSensor(data) {
  const sensor = new Sensor(data);
  return await sensor.save();
}

// 🟢 Update sensor
async function updateSensor(id, updates) {
  const sensor = await Sensor.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true,
  });

  if (!sensor) {
    const error = new Error('Sensor not found');
    error.statusCode = 404;
    throw error;
  }
  return sensor;
}

// 🟢 Delete sensor
async function deleteSensor(id) {
  const sensor = await Sensor.findByIdAndDelete(id);
  if (!sensor) {
    const error = new Error('Sensor not found');
    error.statusCode = 404;
    throw error;
  }
  return sensor;
}

module.exports = {
  getAllSensors,
  getSensorById,
  createSensor,
  updateSensor,
  deleteSensor,
};
