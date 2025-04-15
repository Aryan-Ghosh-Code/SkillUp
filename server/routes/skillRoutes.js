// routes/skillRoutes.js
const express = require('express');
const router = express.Router();
const {
  createSkillSwapSession,
  enrollInSession,
  getAllSessions,
  getMyEnrolledSessions
} = require('../controllers/skillSwapController');
const { protect } = require('../middlewares/authMiddleware');
// const upload = require('../middlewares/uploadMiddleware');

// Create a new SkillSwap session (video upload required)
router.post('/create', protect, createSkillSwapSession);

// Enroll in a SkillSwap session
router.post('/enroll/:sessionId', protect, enrollInSession);

// Get all available sessions
router.get('/sessions', getAllSessions);

// Get sessions enrolled by the logged-in user
router.get('/enrolled', protect, getMyEnrolledSessions);

module.exports = router;
