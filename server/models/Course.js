// const mongoose = require('mongoose');

// const courseSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   description: { type: String, required: true },
//   price: { type: Number, required: true },
//   mentor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   ratings: [{ user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, rating: Number }],
//   enrollments: { type: Number, default: 0 },
//   createdAt: { type: Date, default: Date.now },
// });

// const Course = mongoose.model('Course', courseSchema);
// module.exports = Course;

const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  mentor: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true
  },
  videoUrl: String,
  enrolledUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  category: String,
  ratings: [{ user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, rating: Number }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Course', courseSchema);

