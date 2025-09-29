const e = require('express');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const CommandSchema = new Schema({
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
  actuatorId:
  {
    type: Schema.Types.ObjectId,
    ref: 'Actuator',
    required: true
  },
  command:
  {
    type: String,
    enum: ['turn_on', 'turn_off', 'set_value'],
    required: true
  },
  type:
  {
    type: String,
    enum: ['auto', 'manual'],
    required: true
  },
  payload:
  {
    type: Object,
    required: true
  },
  status:
  {
    type: String,
    enum: ['pending', 'sent', 'accepted', 'failed'],
    default: 'pending'
  }
}, { timestamps: true });
CommandSchema.index({ deviceId: 1 });
CommandSchema.index({ stageId: 1 });
CommandSchema.index({ actuatorId: 1 });

module.exports = mongoose.model('Command', CommandSchema);