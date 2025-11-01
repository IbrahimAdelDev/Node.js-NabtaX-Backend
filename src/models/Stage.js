const mongoose = require('mongoose');
const { Schema } = mongoose;
const PlantSchema = require('./Plant');

const StageSchema = new Schema({
  gardenId: {
    type: Schema.Types.ObjectId,
    ref: 'Garden',
    required: true
  },
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
  QRCode: {
    id: {
      type: String,
      unique: true,
      sparse: true
    },
    imageUrl: {
      type: String
    }
  },
  plants: {
    type: [PlantSchema],
    default: []
  },
  // 🧠 الحساسات Sensors المرتبطة بالجهاز
  sensors: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Sensor',
    },
  ],

  // ⚙️ المشغلات (Actuators) المرتبطة بالجهاز
  actuators: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Actuator',
    },
  ],
}, { timestamps: true });
StageSchema.index({ deviceId: 1 });

module.exports = mongoose.model('Stage', StageSchema);
