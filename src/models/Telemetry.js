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
  received_at: {
    type: Date,
    default: Date.now
  },
  value: {
    type: Number,
    required: true
  },
  unit: {
    type: String,
    enum: ['C', 'F', '%', 'pH', 'mS/cm'],
    required: true
  },
  metadata: {
    deviceId: {
      type: Schema.Types.ObjectId,
      ref: 'Device',
      required: true,
      index: true
    },
    stageId: {
      type: Schema.Types.ObjectId,
      ref: 'Stage',
      required: true,
      index: true
    },
    sensorId: {
      type: Schema.Types.ObjectId,
      ref: 'Sensor',
      required: true,
      index: true
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
TelemetrySchema.index({ 'metadata.sensorId': 1, timestamp: -1 });
TelemetrySchema.index({ 'metadata.stageId': 1, timestamp: -1 });

// ✅ نموذج محدد باسم telemetries (collection ثابت)
module.exports = mongoose.model('Telemetry', TelemetrySchema, 'telemetries');


// const mongoose = require('mongoose');
// const { Schema } = mongoose;

// // Schema عادي للتعامل مع collection بعد إنشائها
// const TelemetrySchema = new Schema({
//   timestamp: {
//     type: Date,
//     default: Date.now,
//     required: true
//   },
//   received_at: {
//     type: Date,
//     default: Date.now
//   },
//   value: {
//     type: Number,
//     required: true
//   },
//   unit: {
//     type: String,
//     enum: ['C', 'F', '%', 'pH', 'mS/cm'],
//     required: true
//   },
//   metadata: {
//     deviceId: {
//       type: Schema.Types.ObjectId,
//       ref: 'Device',
//       required: true
//     },
//     stageId: {
//       type: Schema.Types.ObjectId,
//       ref: 'Stage',
//       required: true
//     },
//     sensorId: {
//       type: Schema.Types.ObjectId,
//       ref: 'Sensor',
//       required: true
//     }
//   }
// }, { 
//   timeseries: {
//     timeField: 'timestamp',
//     metaField: 'metadata',
//     granularity: 'seconds'
//   },
//   expireAfterSeconds: 60 * 60 * 24 * 365, 
//   timestamps: true
// });

// // Indexes لتسريع الاستعلامات
// TelemetrySchema.index({ 'metadata.deviceId': 1 });
// TelemetrySchema.index({ 'metadata.stageId': 1 });
// TelemetrySchema.index({ 'metadata.sensorId': 1 });
// TelemetrySchema.index({ timestamp: 1 });

// module.exports = mongoose.model('Telemetry', TelemetrySchema, 'telemetries');