const mongoose = require('mongoose');
const { Schema } = mongoose;

const DeviceSchema = new Schema({
  ownerId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  sensors: [{
    type: Schema.Types.ObjectId,
    ref: 'Sensor'
  }],
  actuators: [{
    type: Schema.Types.ObjectId,
    ref: 'Actuator'
  }],
  serial: {
    type: String,
    unique: true,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  specifications: {
    type: String,
    required: true
  },
  firmware: {
    type: String,
    required: true
  },
  manufacturer: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'maintenance', 'decommissioned'],
    default: 'active'
  }
}, { timestamps: true });

module.exports = mongoose.model('Device', DeviceSchema);
