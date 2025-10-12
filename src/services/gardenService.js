const Garden = require('../models/Garden');

class GardenService {
  // Create Garden
  async createGarden(data) {
    const garden = new Garden(data);
    return await garden.save();
  }

  // Get all Gardens
  async getAllGardens() {
    return await Garden.find()
      .populate('ownerId')
      .populate('engineers')
      .populate('workers')
      .populate('devices')
      .populate('sprinklers')
      .populate('stages');
  }

  // Get one Garden by ID
  async getGardenById(id) {
    return await Garden.findById(id)
      .populate('ownerId')
      .populate('engineers')
      .populate('workers')
      .populate('devices')
      .populate('sprinklers')
      .populate('stages');
  }

  // Update Garden
  async updateGarden(id, data) {
    return await Garden.findByIdAndUpdate(id, data, { new: true });
  }

  // Delete Garden
  async deleteGarden(id) {
    return await Garden.findByIdAndDelete(id);
  }
}

module.exports = new GardenService();
