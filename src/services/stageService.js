const Stage = require('../models/Stage');

class StageService {
  async getAll() {
    return await Stage.find().populate('deviceId');
  }

  async getById(id) {
    return await Stage.findById(id).populate('deviceId');
  }

  async create(data) {
    const stage = new Stage(data);
    return await stage.save();
  }

  async update(id, data) {
    return await Stage.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    return await Stage.findByIdAndDelete(id);
  }
}

module.exports = new StageService();
