const mongoose = require('mongoose');
const { level } = require('winston');
const { Schema } = mongoose;

const StageSchema = new Schema({
  deviceId: {
    type: Schema.Types.ObjectId,
    ref: 'Device',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['grow_bed', 'water_tank', 'nutrient_tank'],
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'error'],
    default: 'inactive'
  },
  level: {
    type: Number,
    default: 0
  },
  maxPlants: {
    type: Number,
    default: 1
  },
}, { timestamps: true });
StageSchema.index({ deviceId: 1 });

module.exports = mongoose.model('Stage', StageSchema);
