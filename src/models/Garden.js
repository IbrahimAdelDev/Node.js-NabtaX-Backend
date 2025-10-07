const mongoose = require('mongoose');
const { Schema } = mongoose;

// Garden Schema
const gardenSchema = new Schema({
  ownerId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 64
  },
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
  engineers: 
  [{ 
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  workers: 
  [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }], 
  devices: 
  [{
    type: Schema.Types.ObjectId,
    ref: 'Device'
  }], 
  sprinklers: 
  [{
    type: Schema.Types.ObjectId,
    ref: 'Sprinkler'
  }], 
  stages: 
  [{
    type: Schema.Types.ObjectId,
    ref: 'Stage'
  }], 
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

gardenSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

gardenSchema.index({ ownerId: 1 });

module.exports = mongoose.model('Garden', gardenSchema);
