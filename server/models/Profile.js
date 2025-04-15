const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  age: Number,
  requirements: [String],
  about: String,
  image: String,
  skills: [String],
  enrolledSkills: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SkillSwapSession' }],
  offeredSkills: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SkillSwapSession' }],
  purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  offeredCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
}, { timestamps: true });

module.exports = mongoose.model('Profile', profileSchema);
