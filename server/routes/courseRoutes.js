// routes/courseRoutes.js
const express = require('express');
const router = express.Router();
const { createCourse, purchaseCourse, getAllCourses } = require('../controllers/courseController');
const { protect } = require('../middlewares/authMiddleware');
// const upload = require('../middlewares/uploadMiddleware');

// Create a course (for mentors)
router.post('/create', protect, createCourse);

// Purchase a course (upon successful payment, this can be called to update records)
router.post('/purchase/:courseId', protect, purchaseCourse);

// Get list of courses
router.get('/get-courses', getAllCourses);

module.exports = router;
