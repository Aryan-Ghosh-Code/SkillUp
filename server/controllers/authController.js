// const User = require('../models/User');
// const jwt = require('jsonwebtoken');

// const generateToken = (id) => {
//     return jwt.sign({ id }, "F#43DfsgQ!xze8A34Ll!83kjEwe23Q@Sle$1", {
//     expiresIn: '30d'
//     });
// };

// const registerUser = async (req, res, next) => {
//     try
//     {
//         const { name, email, role, password } = req.body;
//         const userExists = await User.findOne({ email });
//         if (userExists)
//             {
//             res.status(400);
//             throw new Error('User already exists');
//             }
//         const user = await User.create({ name, email, role, password });
//         res.status(201).json({
//             _id: user._id,
//             name: user.name,
//             email: user.email,
//             role: user.role,
//             token: generateToken(user._id)
//         });
//     } 
//     catch (error)
//     {
//     next(error);
//     }
// };

// const loginUser = async (req, res, next) => {
//     try
//     {
//         const { email, password } = req.body;
//         const user = await User.findOne({ email });
//         if (user && (await user.matchPassword(password))) 
//         {
//             res.json({
//             _id: user._id,
//             name: user.name,
//             email: user.email,
//             role: user.role,
//             token: generateToken(user._id)
//             });
//         } 
//         else
//         {
//             res.status(401);
//             throw new Error('Invalid email or password');
//         }
//     }
//         catch (error)
//         {
//             next(error);
//         }
// };

// module.exports = { registerUser, loginUser };

// controllers/authController.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Profile = require('../models/Profile');
const Credit = require('../models/Credit');

// Secret key for JWT – ensure you keep this in an environment variable in production
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

const generateToken = (user) => {
  return jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });
};

/**
 * @desc   Register a new user
 * @route  POST /api/auth/register
 * @access Public
 */
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Create Profile and Credit documents for the user
    const profile = await Profile.create({});
    const credit = await Credit.create({});

    user = new User({
      name,
      email,
      password,
      role,
      profile: profile._id,
      credit: credit._id
    });
    await user.save();

    profile.userId = user._id;
    credit.userId = user._id;
    await Promise.all([profile.save(), credit.save()]);

    const token = generateToken(user);

    res.status(201).json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Register Error:', error);
    res.status(500).json({ msg: 'Server Error: Unable to register' });
  }
};

/**
 * @desc   Log in a user
 * @route  POST /api/auth/login
 * @access Public
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Verify password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const token = generateToken(user);

    res.status(200).json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ msg: 'Server Error: Unable to login' });
  }
};
