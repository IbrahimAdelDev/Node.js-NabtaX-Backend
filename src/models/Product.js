const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductSchema = new Schema({
  name:
  {
    type: String,
    required: true,
    trim: true,
    maxlength: 32
  },
  model:
  {
    type: String,
    required: true,
    trim: true,
    maxlength: 32
  },
  code:
  {
    type: String,
    unique: true,
    required: true,
    trim: true,
    maxlength: 32
  },
  description:
  {
    type: String,
    trim: true,
    maxlength: 256
  },
  specs: {
    height:
    {
      type: Number,
      required: true
    },
    width: {
      type: Number,
      required: true
    },
    depth: {
      type: Number,
      required: true
    },
    weight: {
      type: Number,
      required: true
    },
    electrical: {
      voltage: {
        type: Number,
        required: true
      },
      power: {
        type: Number,
        required: true
      }
    },
    capacity: {
      type: Number,
      required: true
    },
    material: {
      type: String,
      trim: true,
      maxlength: 64
    },
    color: {
      type: String,
      trim: true,
      maxlength: 32
    },
    metadata: {
      type: Object
    }
  },
  sensors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Sensor',
      required: true
    }
  ],
  actuators: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Actuator',
      required: true
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);
