// controllers/actuatorController.js
const ActuatorService = require('../services/actuatorService');

// 🟢 Get all
exports.getAllActuators = async (req, res, next) => {
  try {
    const actuators = await ActuatorService.getAllActuators();
    res.status(200).json(actuators);
  } catch (error) {
    next(error);
  }
};

// 🟢 Get by ID
exports.getActuatorById = async (req, res, next) => {
  try {
    const actuator = await ActuatorService.getActuatorById(req.params.id);
    res.status(200).json(actuator);
  } catch (error) {
    next(error);
  }
};

// 🟢 Create
exports.createActuator = async (req, res, next) => {
  try {
    const actuator = await ActuatorService.createActuator(req.body);
    res.status(201).json(actuator);
  } catch (error) {
    next(error);
  }
};

// 🟢 Update
exports.updateActuator = async (req, res, next) => {
  try {
    const actuator = await ActuatorService.updateActuator(req.params.id, req.body);
    res.status(200).json(actuator);
  } catch (error) {
    next(error);
  }
};

// 🟢 Delete
exports.deleteActuator = async (req, res, next) => {
  try {
    const actuator = await ActuatorService.deleteActuator(req.params.id);
    res.status(200).json({ message: 'Actuator deleted', actuator });
  } catch (error) {
    next(error);
  }
};

// 🟢 Update Schedule
exports.updateActuatorSchedule = async (req, res, next) => {
  try {
    const actuator = await ActuatorService.updateActuatorSchedule(req.params.id, req.body.schedule);
    res.status(200).json(actuator);
  } catch (error) {
    next(error);
  }
};
