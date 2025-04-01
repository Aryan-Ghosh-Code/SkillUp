const express = require('express');
const router = express.Router();
const { createSkillSwapSession, getSkillSwapSessions } = require('../controllers/skillSwapController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/', protect, createSkillSwapSession);
router.get('/', protect, getSkillSwapSessions);

module.exports = router;
