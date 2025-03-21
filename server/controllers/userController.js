const User = require('../models/User');

const getUserProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        if (user)
        {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            bio: user.bio,
            credits: user.credits
        });
        } 
        else 
        {
        res.status(404);
        throw new Error('User not found');
        }
    } 
    catch (error) 
    {
        next(error);
    }
};

const updateUserProfile = async (req, res, next) => {
    try 
    {
        const user = await User.findById(req.user.id);
        if (user) {
            user.name = req.body.name || user.name;
            user.bio = req.body.bio || user.bio;
            if (req.body.password) {
            user.password = req.body.password;
            }
            const updatedUser = await user.save();
            res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role,
            bio: updatedUser.bio,
            credits: updatedUser.credits
        });
    } 
    else 
    {
        res.status(404);
        throw new Error('User not found');
    }
    } 
    catch (error) 
    {
    next(error);
    }
};

module.exports = { getUserProfile, updateUserProfile };