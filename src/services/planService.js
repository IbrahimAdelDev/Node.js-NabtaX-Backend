// 📁 services/planService.js
const Plan = require('../models/Plan');

// 🟢 Get all plans
async function getAllPlans() {
  return await Plan.find().sort({ createdAt: -1 });
}

// 🟢 Get plan by ID
async function getPlanById(id) {
  const plan = await Plan.findById(id);
  if (!plan) {
    const error = new Error('Plan not found');
    error.statusCode = 404;
    throw error;
  }
  return plan;
}

// 🟢 Create new plan
async function createPlan(data) {
  const plan = new Plan(data);
  return await plan.save();
}

// 🟢 Update plan by ID
async function updatePlan(id, updates) {
  delete updates._id; // prevent ID updates
  const plan = await Plan.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true
  });
  if (!plan) {
    const error = new Error('Plan not found');
    error.statusCode = 404;
    throw error;
  }
  return plan;
}

// 🟢 Delete plan by ID
async function deletePlan(id) {
  const plan = await Plan.findByIdAndDelete(id);
  if (!plan) {
    const error = new Error('Plan not found');
    error.statusCode = 404;
    throw error;
  }
  return plan;
}

module.exports = {
  getAllPlans,
  getPlanById,
  createPlan,
  updatePlan,
  deletePlan
};
