const mongoose = require('mongoose');

const courseSchema = mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        mentor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        price: { type: Number, required: true },
        rating: { type: Number, default: 0 },
        enrollments: { type: Number, default: 0 }
    },
    { timestamps: true }
);

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
