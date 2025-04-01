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

// const User = require('../models/User');

// const updateUserProfile = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.user.id);
//     if (user) {
//       user.age = req.body.age || user.age;
//       user.qualification = req.body.qualification || user.qualification;
//       user.requirements = req.body.requirements || user.requirements;
//       user.about = req.body.about || user.about;
//       user.skills = req.body.skills || user.skills;
//       user.image = req.body.image || user.image;
//       const updatedUser = await user.save();
//       res.json(updatedUser);
//     } else {
//       res.status(404);
//       throw new Error('User not found');
//     }
//   } catch (error) {
//     console.log(error)
//     next(error);
//   }
// };

// const getUserProfile = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.user.id);
//     if (user) {
//       res.json(user);
//     } else {
//       res.status(404);
//       throw new Error('User not found');
//     }
//   } catch (error) {
//     next(error);
//   }
// };

// module.exports = { updateUserProfile, getUserProfile };

// controllers/userController.js

const updateCoursesViewed = async (req, res, next) => {
    try {
      const { courseId } = req.body; // Or videoId, depending on your data model.
      const user = await User.findById(req.user._id);
      if (!user) {
        res.status(404);
        throw new Error('User not found');
      }
      // Check if courseId is already in the coursesViewed array
      if (!user.coursesViewed.includes(courseId)) {
        user.coursesViewed.push(courseId);
        // Optionally, deduct free credits if needed:
        // user.freeCredits = user.freeCredits - costOfViewing;
        await user.save();
      }
      res.status(200).json({ message: 'Courses viewed updated', coursesViewed: user.coursesViewed });
    } catch (error) {
      next(error);
    }
  };
  
  module.exports = { updateCoursesViewed, getUserProfile, updateUserProfile };
  
