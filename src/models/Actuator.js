const mongoose = require('mongoose');
const { Schema } = mongoose;
const ScheduleSchema = require('./Schedule');

const ActuatorSchema = new Schema({
  deviceId:
  {
    type: Schema.Types.ObjectId,
    ref: 'Device',
    required: true
  },
  stageId:
  {
    type: Schema.Types.ObjectId,
    ref: 'Stage',
    required: true
  },
  type: {
    type: String,
    enum: ['heater', 'cooler', 'pump', 'led', 'valve'],
  },
  name: {
    type: String,
    required: true
  },
  state: {
    type: String,
    enum: ['on', 'off', 'error'],
    default: 'off'
  },
  value: {
    type: Number,
    default: 0
  },
  capabilities: {
    type: Object,
    default: {},
    required: true
  },
  schedule: {
    type: ScheduleSchema,
    required: true,
    default: () => ({})
  }
}, { timestamps: true });
ActuatorSchema.index({ deviceId: 1 });
ActuatorSchema.index({ stageId: 1 });

module.exports = mongoose.model('Actuator', ActuatorSchema);
