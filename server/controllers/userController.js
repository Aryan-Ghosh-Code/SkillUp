// controllers/userController.js
const User = require('../models/User');
const Profile = require('../models/Profile');

/**
 * @desc   Get the authenticated user profile
 * @route  GET /api/users/profile
 * @access Private
 */
exports.getProfile = async (req, res) => {
  try {
    const user = await Profile.findOne({ userId: req.user.id });
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Get Profile Error:', error);
    res.status(500).json({ msg: 'Server Error: Unable to fetch profile' });
  }
};

/**
 * @desc   Update user profile information
 * @route  PUT /api/users/profile
 * @access Private
 */
exports.updateProfile = async (req, res) => {
  try {
    const { age, requirements, about, image, skills } = req.body;

    const profile = await Profile.findOneAndUpdate(
      { _id: req.user.profile },
      { age, requirements, about, image, skills },
      { new: true }
    );

    res.status(200).json({ msg: 'Profile updated successfully', profile });
  } catch (error) {
    console.error('Update Profile Error:', error);
    res.status(500).json({ msg: 'Server Error: Unable to update profile' });
  }
};
