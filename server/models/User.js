// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

// const userSchema = mongoose.Schema(
//     {
//         name: { type: String, required: true },
//         email: { type: String, required: true, unique: true },
//         password: { type: String, required: true },
//         role: {
//             type: String,
//             enum: ['Skill Swapper', 'Mentor'],
//             default: 'Skill Swapper'
//         },
//         bio: { type: String, default: '' },
//         credits: { type: Number, default: 100 }
//     },
//     { timestamps: true }
// );

// userSchema.pre('save', async function (next) {
//     if (!this.isModified('password')) 
//         return next();
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
// });

// userSchema.methods.matchPassword = async function (enteredPassword) {
//     return await bcrypt.compare(enteredPassword, this.password);
// };

// const User = mongoose.model('User', userSchema);
// module.exports = User;

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['learner', 'mentor'], required: true },
  freeCredits: { type: Number, default: 0 },
  age: { type: Number },
  qualification: { type: String },
  requirements: { type: String },
  about: { type: String },
  skills: { type: [String] },
  image: { type: String },
  coursesViewed: { type: [String] },
  coursesOffered: { type: [String] },
  sessionsOffered: { type: [mongoose.Schema.Types.ObjectId], ref: 'SkillSwapSession', default: [] },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
