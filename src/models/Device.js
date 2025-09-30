const mongoose = require('mongoose');
const { Schema } = mongoose;

const DeviceSchema = new Schema({
  userId:
  {
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
  manufacturer: String,
  location: {
    country: {
      type: String,
      trim: true,
      maxlength: 32
    },
    city: {
      type: String,
      trim: true,
      maxlength: 32
    },
    address: {
      type: String,
      trim: true,
      maxlength: 64
    },
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'maintenance', 'decommissioned'],
    default: 'active'
  }
}, { timestamps: true });

module.exports = mongoose.model('Device', DeviceSchema);
