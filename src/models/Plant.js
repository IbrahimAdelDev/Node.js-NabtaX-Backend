const mongoose = require('mongoose');
const { Schema } = mongoose;

const PlantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true 
  },
  number: {
    type: Number,
    required: true 
  },
  plantedAt: { 
    type: Date, 
    required: true 
  },
}, { _id: false });

module.exports = PlantSchema;