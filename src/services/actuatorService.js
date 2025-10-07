// services/actuatorService.js
const Actuator = require('../models/Actuator');

// 🟢 Get all actuators
async function getAllActuators() {
  return await Actuator.find()
    .populate('deviceId', 'name _id')
    .populate('stageId', 'name _id');
}

// 🟢 Get actuator by ID
async function getActuatorById(id) {
  const actuator = await Actuator.findById(id)
    .populate('deviceId', 'name _id')
    .populate('stageId', 'name _id');

  if (!actuator) {
    const error = new Error('Actuator not found');
    error.statusCode = 404;
    throw error;
  }
  return actuator;
}

// 🟢 Create actuator
async function createActuator(data) {
  const actuator = new Actuator(data);
  return await actuator.save();
}

// 🟢 Update actuator
async function updateActuator(id, updates) {
  const actuator = await Actuator.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true,
  });

  if (!actuator) {
    const error = new Error('Actuator not found');
    error.statusCode = 404;
    throw error;
  }

  return actuator;
}

// 🟢 Delete actuator
async function deleteActuator(id) {
  const actuator = await Actuator.findByIdAndDelete(id);
  if (!actuator) {
    const error = new Error('Actuator not found');
    error.statusCode = 404;
    throw error;
  }
  return actuator;
}

// 🟢 Update actuator schedule only
async function updateActuatorSchedule(id, scheduleData) {
  const actuator = await Actuator.findByIdAndUpdate(
    id,
    { schedule: scheduleData },
    { new: true, runValidators: true }
  );

  if (!actuator) {
    const error = new Error('Actuator not found');
    error.statusCode = 404;
    throw error;
  }

  return actuator;
}

module.exports = {
  getAllActuators,
  getActuatorById,
  createActuator,
  updateActuator,
  deleteActuator,
  updateActuatorSchedule,
};
