const mongoose = require('mongoose');
const { Schema } = mongoose;

const SensorSchema = new Schema({
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
    enum: ['temp', 'humidity', 'ph', 'ec'],
    required: true
  },
  unit: {
    type: String,
    enum: ['C', 'F', '%', 'pH', 'mS/cm'],
    required: true
  },
  calibration: {
    type: Object,
    required: true
  }
}, { timestamps: true });
SensorSchema.index({ deviceId: 1 });
SensorSchema.index({ stageId: 1 });

module.exports = mongoose.model('Sensor', SensorSchema);
