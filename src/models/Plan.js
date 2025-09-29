const e = require('express');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const PlanSchema = new Schema({
  slug: {
    type: String,
    enum: ['free', 'pro', 'enterprise'],
    default: 'free',
    required: true,
    unique: true,
    trim: true,
    maxlength: 16,
    minlength: 3
  },
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 32,
    minlength: 3
  },
  priceMonthly: {
    type: Number,
    required: true,
    min: 0
  },
  priceYearly: {
    type: Number,
    required: true,
    min: 0
  },
  features: {
    type: [String],
    required: true
  },
  deviceLimit: {
    type: Number,
    required: true,
    default: 1,
    min: 1,
    max: 5,
  }
}, { timestamps: true });

module.exports = mongoose.model('Plan', PlanSchema);