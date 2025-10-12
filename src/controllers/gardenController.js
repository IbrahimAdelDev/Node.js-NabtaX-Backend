const gardenService = require('../services/gardenService');

class GardenController {
  async createGarden(req, res) {
    try {
      const garden = await gardenService.createGarden(req.body);
      res.status(201).json(garden);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async getAllGardens(req, res) {
    try {
      const gardens = await gardenService.getAllGardens();
      res.json(gardens);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getGardenById(req, res) {
    try {
      const garden = await gardenService.getGardenById(req.params.id);
      if (!garden) return res.status(404).json({ message: 'Garden not found' });
      res.json(garden);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async updateGarden(req, res) {
    try {
      const garden = await gardenService.updateGarden(req.params.id, req.body);
      if (!garden) return res.status(404).json({ message: 'Garden not found' });
      res.json(garden);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async deleteGarden(req, res) {
    try {
      const garden = await gardenService.deleteGarden(req.params.id);
      if (!garden) return res.status(404).json({ message: 'Garden not found' });
      res.json({ message: 'Garden deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = new GardenController();
