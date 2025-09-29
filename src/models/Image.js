const mongoose = require('mongoose');
const { Schema } = mongoose;

const ImageSchema = new Schema({
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
  ts:
  {
    type: Date,
    default: Date.now
  },
  url:
  {
    type: String,
    required: true
  }
}, { timestamps: true });
ImageSchema.index({ deviceId: 1 });
ImageSchema.index({ stageId: 1 });
ImageSchema.index({ ts: 1 });
ImageSchema.index({ createdAt: 1 });

module.exports = mongoose.model('Image', ImageSchema);
