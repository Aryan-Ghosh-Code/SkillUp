const Course = require('../models/Course');

const createCourse = async (req, res, next) => {
    try
    {
        if (req.user.role !== 'mentor')
        {
            res.status(401);
            throw new Error('Not authorized as a mentor');
        }
        const { title, description, price } = req.body;
        const course = await Course.create({
            title,
            description,
            price,
            mentor: req.user.id
        });
        res.status(201).json(course);
    } 
    catch (error)
    {
    next(error);
    }
};

const getCourses = async (req, res, next) => {
    try 
    {
    const courses = await Course.find({}).populate('mentor', 'name email');
    res.json(courses);
    } 
    catch (error)
    {
    next(error);
    }
};

module.exports = { createCourse, getCourses };
