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
      // .populate('sprinklers')
      .populate('stages');
  }

  // Get Gardens by Owner ID
  async getGardensByOwnerId(ownerId) {
    return await Garden.find({ ownerId })
      .populate('ownerId')
      .populate('engineers')
      .populate('workers')
      .populate('devices')
      // .populate('sprinklers')
      .populate('stages');
  }

  // Get one Garden by ID
  async getGardenById(id) {
    return await Garden.findById(id)
      .populate('ownerId')
      .populate('engineers')
      .populate('workers')
      .populate('devices')
      // .populate('sprinklers')
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

  async addUserToGarden(gardenId, userId, role) {
    const field = role === 'engineer' ? 'engineers' : 'workers';
    return await Garden.findByIdAndUpdate(
      gardenId,
      { $addToSet: { [field]: userId } }, // $addToSet يمنع التكرار
      { new: true }
    ).populate(['engineers', 'workers']);
  }

  async removeUserFromGarden(gardenId, userId, role) {
    const field = role === 'engineer' ? 'engineers' : 'workers';
    return await Garden.findByIdAndUpdate(
      gardenId,
      { $pull: { [field]: userId } },
      { new: true }
    ).populate(['engineers', 'workers']);
  }


}

module.exports = new GardenService();
