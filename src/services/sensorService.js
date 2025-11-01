// services/sensorService.js
const Sensor = require('../models/Sensor');
const Device = require('../models/Device');
const Stage = require('../models/Stage');

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
  const savedSensor = await sensor.save();

  // Update Device to include this Sensor
  const device = await Device.findById(data.deviceId);
  if (device) {
    device.sensors.push(savedSensor._id);
    await device.save();
  }

  // Update Stage to include this Sensor
  const stage = await Stage.findById(data.stageId); 
  if (stage) {
    stage.sensors.push(savedSensor._id);
    await stage.save();
  }

  return savedSensor;
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

// get sensor by device ID
async function getSensorsByDeviceId(deviceId) {
  return await Sensor.find({ deviceId })
    .populate('deviceId', 'name _id')
    .populate('stageId', 'name _id');
}

// get sensor by stage ID
async function getSensorsByStageId(stageId) {
  return await Sensor.find({ stageId })
    .populate('deviceId', 'name _id')
    .populate('stageId', 'name _id');
}

module.exports = {
  getAllSensors,
  getSensorById,
  createSensor,
  updateSensor,
  deleteSensor,
  getSensorsByDeviceId,
  getSensorsByStageId,
};
