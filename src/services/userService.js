const bcrypt = require('bcrypt');
const User = require('../models/User');


// 🟢 Create user
async function createUser(data) {
  const { username, name, email, password, role } = data;

  // Make sure the user doesn't already exist
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const error = new Error('User already exists');
    error.statusCode = 400;
    throw error;
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  // Create the user
  const user = await User.create({ username, name, email, hashPassword, role });
  return user;
}

// 🟡 Get all users
async function getAllUsers() {
  const users = await User.find().select('-hashPassword');
  return users;
}

// 🔵 Get single user
async function getUserById(id) {
  const user = await User.findById(id).select('-hashPassword');
  if (!user) {
    const error = new Error('User not found');
    error.statusCode = 404;
    throw error;
  }
  return user;
}

// 🟣 Update user
async function updateUser(id, updates) {
  // Prevent password updates here
  delete updates.hashPassword;
  
  const user = await User.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true,
  }).select('-hashPassword');

  if (!user) {
    const error = new Error('User not found');
    error.statusCode = 404;
    throw error;
  }

  return user;
}

// 🔴 Delete user
async function deleteUser(id) {
  const user = await User.findByIdAndDelete(id);
  if (!user) {
    const error = new Error('User not found');
    error.statusCode = 404;
    throw error;
  }
  return user;
}

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
