const mongoose = require('mongoose');
const { Schema } = mongoose;

const AlertSchema = new Schema({
  deviceId:
  {
    type: Schema.Types.ObjectId,
    ref: 'Device',
    required: true
  },
  severity:
  {
    type: String,
    enum: ['low', 'medium', 'high'],
    required: true
  },
  message:
  {
    type: String,
    required: true
  },
  resolved:
  {
    type: Boolean,
    default: false
  }
}, { timestamps: true });
AlertSchema.index({ deviceId: 1 });
AlertSchema.index({ severity: 1 });
AlertSchema.index({ resolved: 1 });

module.exports = mongoose.model('Alert', AlertSchema);
