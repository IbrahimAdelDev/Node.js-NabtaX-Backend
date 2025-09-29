const mongoose = require('mongoose');
const { Schema } = mongoose;

const DeviceSchema = new Schema({
  userId:
  {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  productType: { type: String, enum: ['vertical_fridge', 'hydro_column'], required: true },
  serial: { type: String, unique: true, required: true },
  firmware: String,
  location: String,
  status: String, // online, offline, error
}, { timestamps: true });

module.exports = mongoose.model('Device', DeviceSchema);
