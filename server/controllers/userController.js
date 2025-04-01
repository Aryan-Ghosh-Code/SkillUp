// const User = require('../models/User');

// const getUserProfile = async (req, res, next) => {
//     try {
//         const user = await User.findById(req.user.id);
//         if (user)
//         {
//         res.json({
//             _id: user._id,
//             name: user.name,
//             email: user.email,
//             role: user.role,
//             bio: user.bio,
//             credits: user.credits
//         });
//         } 
//         else 
//         {
//         res.status(404);
//         throw new Error('User not found');
//         }
//     } 
//     catch (error) 
//     {
//         next(error);
//     }
// };

// const updateUserProfile = async (req, res, next) => {
//     try 
//     {
//         const user = await User.findById(req.user.id);
//         if (user) {
//             user.name = req.body.name || user.name;
//             user.bio = req.body.bio || user.bio;
//             if (req.body.password) {
//             user.password = req.body.password;
//             }
//             const updatedUser = await user.save();
//             res.json({
//             _id: updatedUser._id,
//             name: updatedUser.name,
//             email: updatedUser.email,
//             role: updatedUser.role,
//             bio: updatedUser.bio,
//             credits: updatedUser.credits
//         });
//     } 
//     else 
//     {
//         res.status(404);
//         throw new Error('User not found');
//     }
//     } 
//     catch (error) 
//     {
//     next(error);
//     }
// };

// module.exports = { getUserProfile, updateUserProfile };

const User = require('../models/User');

const updateUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (user) {
      user.age = req.body.age || user.age;
      user.qualification = req.body.qualification || user.qualification;
      user.requirements = req.body.requirements || user.requirements;
      user.about = req.body.about || user.about;
      user.skills = req.body.skills || user.skills;
      user.image = req.body.image || user.image;
      const updatedUser = await user.save();
      res.json(updatedUser);
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  } catch (error) {
    console.log(error)
    next(error);
  }
};

const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { updateUserProfile, getUserProfile };
