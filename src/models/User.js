const mongoose = require('mongoose');
const { Schema } = mongoose;
const RefreshTokenSchema = require('./RefreshToken');

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      maxlength: 32,
      minlength: 3
    },
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 32
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      maxlength: 32,
    },
    hashPassword: {
      type: String,
      required: true,
      minlength: 16,
      maxlength: 128
    },
    role: {
      type: String,
      enum: ['user', 'admin', 'superadmin'],
      default: 'user',
      maxlength: 16
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);