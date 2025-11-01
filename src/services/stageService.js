const Stage = require('../models/Stage');
const Garden = require('../models/Garden');
const Device = require('../models/Device');

class StageService {
  // Create Stage
  async createStage(data) {
    const stage = new Stage(data);
    const savedStage = await stage.save();

    // Update Garden to include this Stage
    const garden = await Garden.findById(data.gardenId);
    if (garden) {
      garden.stages.push(savedStage._id);
      await garden.save();
    }

    // Update Device to include this Stage
    const device = await Device.findById(data.deviceId);
    if (device) {
      device.stages.push(savedStage._id);
      await device.save();
    }

    return savedStage;
  }

  // Get all Stages
  async getAllStages() {
    return await Stage.find()
      .populate('gardenId')
      .populate('deviceId');
  }

  // Get one Stage by ID
  async getStageById(id) {
    return await Stage.findById(id)
      .populate('gardenId')
      .populate('deviceId')
      .populate('actuators')
      .populate('sensors');
  }

  // Update Stage
  async updateStage(id, data) {
    return await Stage.findByIdAndUpdate(id, data, { new: true });
  }

  // Delete Stage
  async deleteStage(id) {
    return await Stage.findByIdAndDelete(id);
  }
}

module.exports = new StageService();
