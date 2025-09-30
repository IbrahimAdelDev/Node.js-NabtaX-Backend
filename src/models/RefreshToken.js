const mongoose = require('mongoose');
const { Schema } = mongoose;

const RefreshTokenSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  deviceUUID: {
    type: String,
    required: true
  },
  token: {
    type: String,
    required: true
  },
  expires: {
    type: Date,
    required: true
  }
}, { timestamps: true });
RefreshTokenSchema.index({ expires: 1 }, { expireAfterSeconds: 0 });
RefreshTokenSchema.index({ userId: 1, deviceUUID: 1 }, { unique: true });
RefreshTokenSchema.index({ userId: 1 });
RefreshTokenSchema.index({ deviceUUID: 1 });
RefreshTokenSchema.index({ token: 1 });
RefreshTokenSchema.index({ token: 1, deviceUUID: 1 }, { unique: true });

module.exports = mongoose.model('RefreshToken', RefreshTokenSchema);