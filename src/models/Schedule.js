const mongoose = require('mongoose');
const { Schema } = mongoose;


const ScheduleSchema = new Schema({
  mode: {
    type: String,
    enum: ['auto', 'manual'],
    default: 'auto'
  },
  start: {
    type: String,
    default: '00:00', 
    match: /^([0-1]\d|2[0-3]):([0-5]\d)$/ 
  },
  end: {
    type: String,
    default: '00:00',
    match: /^([0-1]\d|2[0-3]):([0-5]\d)$/
  },
  days: {
    type: [String],
    enum: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
    default: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']
  },
  timezone: {
    type: String,
    default: 'UTC'
  }
}, { _id: false }); 

module.exports = ScheduleSchema;