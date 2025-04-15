// const mongoose = require('mongoose');

// const skillSwapSessionSchema = new mongoose.Schema({
//   skill: { type: String, required: true },
//   videoUrl: { type: String, required: true },
//   teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   createdAt: { type: Date, default: Date.now },
// });

// const SkillSwapSession = mongoose.model('SkillSwapSession', skillSwapSessionSchema);
// module.exports = SkillSwapSession;

const mongoose = require('mongoose');

const skillSwapSessionSchema = new mongoose.Schema({
  title: String,
  description: String,
  videoUrl: String,
  category: String,
  skillTags: [String],
  offeredBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  SkillSwapper: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  creditCost: { type: Number, default: 10 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SkillSwapSession', skillSwapSessionSchema);
