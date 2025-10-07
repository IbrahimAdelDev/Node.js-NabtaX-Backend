// 📁 services/subscriptionService.js
const Subscription = require('../models/Subscription');

// 🟢 Get all subscriptions
async function getAllSubscriptions() {
  return await Subscription.find()
    .populate('userId')
    .sort({ createdAt: -1 });
}

// 🟢 Get subscription by ID
async function getSubscriptionById(id) {
  const sub = await Subscription.findById(id).populate('userId');
  if (!sub) {
    const error = new Error('Subscription not found');
    error.statusCode = 404;
    throw error;
  }
  return sub;
}

// 🟢 Create new subscription
async function createSubscription(data) {
  const subscription = new Subscription(data);
  return await subscription.save();
}

// 🟢 Update subscription
async function updateSubscription(id, updates) {
  delete updates._id;

  const subscription = await Subscription.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true
  }).populate('userId');

  if (!subscription) {
    const error = new Error('Subscription not found');
    error.statusCode = 404;
    throw error;
  }
  return subscription;
}

// 🟢 Delete subscription
async function deleteSubscription(id) {
  const subscription = await Subscription.findByIdAndDelete(id);
  if (!subscription) {
    const error = new Error('Subscription not found');
    error.statusCode = 404;
    throw error;
  }
  return subscription;
}

module.exports = {
  getAllSubscriptions,
  getSubscriptionById,
  createSubscription,
  updateSubscription,
  deleteSubscription
};
