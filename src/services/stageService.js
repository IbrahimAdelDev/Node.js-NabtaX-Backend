const Stage = require('../models/Stage');

class StageService {
  // Create Stage
  async createStage(data) {
    const stage = new Stage(data);
    return await stage.save();
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
      .populate('deviceId');
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
