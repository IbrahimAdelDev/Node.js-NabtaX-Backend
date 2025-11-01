const mongoose = require('mongoose');
const { Schema } = mongoose;

// Telemetry Schema
const TelemetrySchema = new Schema({
  timestamp: {
    type: Date,
    default: Date.now,
    required: true,
    index: true // تحسين إضافي لسرعة التايم رينج كويريز
  },
  taked_at: {
    type: Date,
    default: Date.now
  },
  value: {
    type: Number,
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
  stageId: {
    type: Schema.Types.ObjectId,
    ref: 'Stage',
    required: true,
  },
  sensorId: {
    type: Schema.Types.ObjectId,
    ref: 'Sensor',
    required: true,
  },
  metadata: {
    deviceId: {
      type: Schema.Types.ObjectId,
      ref: 'Device',
      required: true,
      index: true
    },
    clientId: {
      type: String,
      trim: true
    }
  }
}, {
  timeseries: {
    timeField: 'timestamp',
    metaField: 'metadata',
    granularity: 'seconds'
  },
  expireAfterSeconds: 60 * 60 * 24 * 365, // سنة واحدة
  timestamps: true
});

// ✅ Indexes محسّنة
TelemetrySchema.index({ 'metadata.deviceId': 1, timestamp: -1 });
TelemetrySchema.index({ 'sensorId': 1, timestamp: -1 });
TelemetrySchema.index({ 'stageId': 1, timestamp: -1 });
TelemetrySchema.index({ 'sensorId': 1 });
TelemetrySchema.index({ 'stageId': 1 });

// ✅ نموذج محدد باسم telemetries (collection ثابت)
module.exports = mongoose.model('Telemetry', TelemetrySchema, 'telemetries');

