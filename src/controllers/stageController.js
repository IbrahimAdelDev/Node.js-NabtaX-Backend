const stageService = require('../services/stageService');

exports.getAllStages = async (req, res) => {
  try {
    const stages = await stageService.getAllStages();
    res.status(200).json(stages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getStageById = async (req, res) => {
  try {
    const stage = await stageService.getStageById(req.params.id);
    if (!stage) return res.status(404).json({ message: 'Stage not found' });
    res.status(200).json(stage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createStage = async (req, res) => {
  try {
    const newStage = await stageService.createStage(req.body);
    res.status(201).json(newStage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateStage = async (req, res) => {
  try {
    const updatedStage = await stageService.updateStage(req.params.id, req.body);
    if (!updatedStage) return res.status(404).json({ message: 'Stage not found' });
    res.status(200).json(updatedStage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteStage = async (req, res) => {
  try {
    const deleted = await stageService.deleteStage(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Stage not found' });
    res.status(200).json({ message: 'Stage deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
