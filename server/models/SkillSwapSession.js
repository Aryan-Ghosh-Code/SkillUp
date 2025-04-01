const mongoose = require('mongoose');

const skillSwapSessionSchema = new mongoose.Schema({
  skill: { type: String, required: true },
  videoUrl: { type: String, required: true },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
});

const SkillSwapSession = mongoose.model('SkillSwapSession', skillSwapSessionSchema);
module.exports = SkillSwapSession;
