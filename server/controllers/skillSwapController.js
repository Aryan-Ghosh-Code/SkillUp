// controllers/skillswapController.js
const SkillSwapSession = require('../models/SkillSwapSession');
const User = require('../models/User');
const Credit = require('../models/Credit');
const Profile = require('../models/Profile');
const { Types } = require('mongoose');

/**
 * @desc   Create a new SkillSwap session
 * @route  POST /api/skillswap/create
 * @access Private (SkillSwapper & Mentor)
 */
exports.createSkillSwapSession = async (req, res) => {
  try {
    const { title, description, category, skillTags, creditCost, videoUrl } = req.body;
    const userId = req.user.id;

    const session = new SkillSwapSession({
      title,
      description,
      category,
      skillTags,
      creditCost,
      videoUrl,
      offeredBy: userId
    });

    await session.save();

    // Update user profile for offered skills (you may need to populate 'profile')
    const user = await User.findById(userId);
    // Assuming user's Profile has an array "offeredSkills"
    // Here, you should update the Profile document (if already populated, or via an update)
    await Profile.findByIdAndUpdate(user.profile, {
      $push: { offeredSkills: session._id }
    });

    res.status(201).json({ msg: 'SkillSwap session created', session });
  } catch (error) {
    console.error('Create Session Error:', error);
    res.status(500).json({ msg: 'Server Error: Unable to create session' });
  }
};

/**
 * @desc   Enroll in a SkillSwap session using credit points
 * @route  POST /api/skillswap/enroll/:sessionId
 * @access Private
 */
exports.enrollInSession = async (req, res) => {
  try {
    const userId = req.user.id;
    const sessionId = req.params.sessionId;

    const session = await SkillSwapSession.findById(sessionId);
    const user = await User.findById(userId);

    if (!session) {
      return res.status(400).json({ msg: 'Session not found' });
    }

    // Check if already enrolled
    if (session.SkillSwapper && session.SkillSwapper.includes(userId)) {
      return res.status(400).json({ msg: 'Already enrolled in this session' });
    }

    if (session.offeredBy.equals(userId)) {
      return res.status(400).json({ msg: 'You cannot enroll in your own Skill Swap Session' });
    }

    // Check if the user has enough credits
    const credit = await Credit.findById(user.credit);
    if (credit.balance < session.creditCost) {
      return res.status(400).json({ msg: 'Not enough credits to enroll' });
    }

    // Deduct credits and update transaction history
    credit.balance -= session.creditCost;
    credit.transactions.push({
      type: 'spend',
      amount: session.creditCost,
      description: `Enrolled in SkillSwap session: ${session.title}`
    });
    await credit.save();

    // Add user to the session and update profile's enrolledSkills
    session.SkillSwapper = session.SkillSwapper || [];
    session.SkillSwapper.push(userId);
    await session.save();

    await Profile.findByIdAndUpdate(user.profile, {
      $push: { enrolledSkills: session._id }
    });

    res.status(200).json({ msg: 'Enrolled in session successfully', session });
  } catch (error) {
    console.error('Enroll Session Error:', error);
    res.status(500).json({ msg: 'Server Error: Unable to enroll in session' });
  }
};

/**
 * @desc   Get all available SkillSwap sessions
 * @route  GET /api/skillswap/sessions
 * @access Public
 */
exports.getAllSessions = async (req, res) => {
  try {
    const sessions = await SkillSwapSession.find().populate('offeredBy', 'name');
    res.status(200).json(sessions.reverse());
  } catch (error) {
    console.error('Get Sessions Error:', error);
    res.status(500).json({ msg: 'Server Error: Unable to fetch sessions' });
  }
};

/**
 * @desc   Get sessions the user is enrolled in
 * @route  GET /api/skillswap/enrolled
 * @access Private
 */
exports.getMyEnrolledSessions = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate({
      path: 'profile',
      populate: {
        path: 'enrolledSkills',
        model: 'SkillSwapSession'
      }
    });

    res.status(200).json(user.profile.enrolledSkills);
  } catch (error) {
    console.error('My Enrolled Sessions Error:', error);
    res.status(500).json({ msg: 'Server Error: Unable to fetch enrolled sessions' });
  }
};
