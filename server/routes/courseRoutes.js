// const express = require('express');
// const router = express.Router();
// const { getUserProfile, updateUserProfile } = require('../controllers/userController');
// const { protect } = require('../middlewares/authMiddleware');

// router.get('/profile', protect, getUserProfile);
// router.put('/profile', protect, updateUserProfile);

// module.exports = router;

const express = require('express');
const router = express.Router();
const { createCourse, getCourses, enrollCourse, getCourseVideos } = require('../controllers/courseController');
const { protect } = require('../middlewares/authMiddleware');

router.get('/', getCourses);
router.post('/', protect, createCourse);
router.post('/enroll', protect, enrollCourse);
router.get('/:id/videos', protect, getCourseVideos);

module.exports = router;
