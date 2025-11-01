// services/actuatorService.js
const Actuator = require('../models/Actuator');
const Device = require('../models/Device');
const Stage = require('../models/Stage');

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
  const savedActuator = await actuator.save();

  // Update Device to include this Actuator
  const device = await Device.findById(data.deviceId);
  if (device) {
    device.actuators.push(savedActuator._id);
    await device.save();
  }

  // Update Stage to include this Actuator
  const stage = await Stage.findById(data.stageId); 
  if (stage) {
    stage.actuators.push(savedActuator._id);
    await stage.save();
  }

  return savedActuator;
}

// 🟢 Update actuator
// services/actuatorService.js



// 🟢 Update actuator
async function updateActuator(id, updates, mqttBroker) {
  const actuator = await Actuator.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true,
  });

  if (!actuator) {
    const error = new Error('Actuator not found');
    error.statusCode = 404;
    throw error;
  }

  // console.log('✅ Actuator updated:', actuator);

  // 🟢 Publish actuator state on MQTT
  if (!mqttBroker) {
    console.warn('❌ MQTT broker is undefined, cannot publish actuator state!');
    return actuator;
  }

  if (!actuator.deviceId || !actuator._id) {
    console.warn('❌ actuator.deviceId or actuator._id is missing, cannot publish!');
    return actuator;
  }

  const topic = `devices/${actuator.deviceId.toString()}/actuators/${actuator._id.toString()}/state`;
  const message = { state: actuator.state, timestamp: new Date() };
  mqttBroker.publish(
  {
    topic: topic,
    payload: Buffer.from(JSON.stringify(message)),
    qos: 0,
    retain: false
  },
  (err) => {
    if (err) console.error(`❌ Failed to publish actuator state for ${actuator._id}`, err);
    else console.log(`📡 Actuator state published for ${actuator._id} on topic ${topic}`);
  }
);

  return actuator;
}

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

// get actuators by device ID
async function getActuatorsByDeviceId(deviceId) {
  return await Actuator.find({ deviceId })
    .populate('deviceId', 'name _id')
    .populate('stageId', 'name _id');
}

// get actuators by stage ID
async function getActuatorsByStageId(stageId) {
  return await Actuator.find({ stageId })
    .populate('deviceId', 'name _id')
    .populate('stageId', 'name _id');
}

module.exports = {
  getAllActuators,
  getActuatorById,
  createActuator,
  updateActuator,
  deleteActuator,
  updateActuatorSchedule,
  getActuatorsByDeviceId,
  getActuatorsByStageId,
};
