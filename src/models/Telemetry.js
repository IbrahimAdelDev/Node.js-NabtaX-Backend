const mongoose = require('mongoose');
const { Schema } = mongoose;

const TelemetrySchema = new Schema({
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
  sensorId:
  {
    type: Schema.Types.ObjectId,
    ref: 'Sensor',
    required: true
  },
  ts:
  {
    type: Date,
    default: Date.now
  },
  value:
  {
    type: Number,
    required: true
  },
  unit:
  {
    type: String,
    enum: ['C', 'F', '%', 'pH', 'mS/cm'],
    required: true
  },
  meta:
  {
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
    sensorId:
    {
      type: Schema.Types.ObjectId,
      ref: 'Sensor',
      required: true
    }
  }
}, { versionKey: false });
TelemetrySchema.index({ deviceId: 1 });
TelemetrySchema.index({ stageId: 1 });
TelemetrySchema.index({ sensorId: 1 });


TelemetrySchema.statics.createTimeSeriesCollection = async function () {
  const conn = mongoose.connection;
  const collections = await conn.db.listCollections({ name: 'telemetries' }).toArray();
  
  if (collections.length === 0) {
    await conn.db.createCollection('telemetries', {
      timeseries: {
        timeField: 'ts',       // العمود الزمني
        metaField: {
          deviceId: 'deviceId',
          stageId: 'stageId',
          sensorId: 'sensorId'
        },
        granularity: 'seconds' 
      },
      expireAfterSeconds: 60 * 60 * 24 * 365 
    });
  }
};

module.exports = mongoose.model('Telemetry', TelemetrySchema, 'telemetries');
