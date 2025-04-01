const SkillSwapSession = require('../models/SkillSwapSession');

const createSkillSwapSession = async (req, res, next) => {
  try {
    const { skill, videoUrl } = req.body;
    if (req.user.role !== 'learner') {
      res.status(401);
      throw new Error('Only Skill Swappers can create free sessions.');
    }
    const session = await SkillSwapSession.create({
      skill,
      videoUrl,
      teacher: req.user._id
    });
    res.status(201).json(session);
  } catch (error) {
    next(error);
  }
};

const getSkillSwapSessions = async (req, res, next) => {
  try {
    const sessions = await SkillSwapSession.find({}).populate('teacher', 'name email');
    res.json(sessions);
  } catch (error) {
    next(error);
  }
};

module.exports = { createSkillSwapSession, getSkillSwapSessions };
