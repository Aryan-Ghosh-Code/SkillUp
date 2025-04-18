// controllers/userController.js
const User = require('../models/User');
const Profile = require('../models/Profile');
const Credit = require('../models/Credit');

/**
 * @desc   Get the authenticated user profile
 * @route  GET /api/users/profile
 * @access Private
 */
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password").populate({
      path: "credit",
      model: Credit
    });
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }
    res.status(200).json(user.credit.balance);
  } catch (error) {
    console.error('Get Profile Error:', error);
    res.status(500).json({ error: 'Server Error: Unable to fetch profile' });
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
    ).select("-password");

    res.status(200).json({ msg: 'Profile updated successfully', profile });
  } catch (error) {
    console.error('Update Profile Error:', error);
    res.status(500).json({ error: 'Server Error: Unable to update profile' });
  }
};
