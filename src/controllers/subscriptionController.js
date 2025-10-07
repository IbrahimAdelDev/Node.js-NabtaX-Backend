// 📁 controllers/subscriptionController.js
const subscriptionService = require('../services/subscriptionService');

// 🟢 Get all
exports.getAll = async (req, res, next) => {
  try {
    const subs = await subscriptionService.getAllSubscriptions();
    res.status(200).json(subs);
  } catch (err) {
    next(err);
  }
};

// 🟢 Get by ID
exports.getById = async (req, res, next) => {
  try {
    const sub = await subscriptionService.getSubscriptionById(req.params.id);
    res.status(200).json(sub);
  } catch (err) {
    next(err);
  }
};

// 🟢 Create
exports.create = async (req, res, next) => {
  try {
    const sub = await subscriptionService.createSubscription(req.body);
    res.status(201).json(sub);
  } catch (err) {
    next(err);
  }
};

// 🟢 Update
exports.update = async (req, res, next) => {
  try {
    const sub = await subscriptionService.updateSubscription(req.params.id, req.body);
    res.status(200).json(sub);
  } catch (err) {
    next(err);
  }
};

// 🟢 Delete
exports.remove = async (req, res, next) => {
  try {
    await subscriptionService.deleteSubscription(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
