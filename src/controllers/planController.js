// 📁 controllers/planController.js
const planService = require('../services/planService');

// 🟢 Get all plans
exports.getAll = async (req, res, next) => {
  try {
    const plans = await planService.getAllPlans();
    res.status(200).json(plans);
  } catch (err) {
    next(err);
  }
};

// 🟢 Get plan by ID
exports.getById = async (req, res, next) => {
  try {
    const plan = await planService.getPlanById(req.params.id);
    res.status(200).json(plan);
  } catch (err) {
    next(err);
  }
};

// 🟢 Create new plan
exports.create = async (req, res, next) => {
  try {
    const plan = await planService.createPlan(req.body);
    res.status(201).json(plan);
  } catch (err) {
    next(err);
  }
};

// 🟢 Update plan
exports.update = async (req, res, next) => {
  try {
    const plan = await planService.updatePlan(req.params.id, req.body);
    res.status(200).json(plan);
  } catch (err) {
    next(err);
  }
};

// 🟢 Delete plan
exports.remove = async (req, res, next) => {
  try {
    await planService.deletePlan(req.params.id);
    res.status(204).send(); // No content
  } catch (err) {
    next(err);
  }
};
