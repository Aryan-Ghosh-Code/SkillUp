const Course = require('../models/Course');
const User = require('../models/User');

const createCourse = async (req, res, next) => {
  try {
    if (req.user.role !== 'mentor') {
      res.status(401);
      throw new Error('Not authorized as mentor');
    }
    const { title, description, price, videos } = req.body;
    // videos is expected to be an array of objects { title, videoUrl, duration, description }
    const course = await Course.create({
      title,
      description,
      price,
      mentor: req.user._id,
      videos
    });
    res.status(201).json(course);
  } catch (error) {
    next(error);
  }
};

const getCourses = async (req, res, next) => {
  try {
    const courses = await Course.find({}).populate('mentor', 'name email');
    res.json(courses);
  } catch (error) {
    next(error);
  }
};

const enrollCourse = async (req, res, next) => {
  try {
    const { courseId } = req.body;
    // Simulate payment success and enroll the user in the course.
    const user = await User.findById(req.user._id);
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }
    // If not already enrolled, add the course to user's enrolledCourses
    if (!user.enrolledCourses.includes(courseId)) {
      user.enrolledCourses.push(courseId);
      await user.save();
    }
    // Update course enrollments
    const course = await Course.findById(courseId);
    if (course) {
      course.enrollments += 1;
      await course.save();
      res.status(200).json({ message: "Enrollment successful" });
    } else {
      res.status(404);
      throw new Error("Course not found");
    }
  } catch (error) {
    next(error);
  }
};

const getCourseVideos = async (req, res, next) => {
  try {
    const courseId = req.params.id;
    const user = await User.findById(req.user._id);
    // Check if the user is enrolled in this course
    if (!user.enrolledCourses.includes(courseId)) {
      res.status(403);
      throw new Error("You are not enrolled in this course");
    }
    const course = await Course.findById(courseId);
    if (!course) {
      res.status(404);
      throw new Error("Course not found");
    }
    res.status(200).json({ videos: course.videos });
  } catch (error) {
    next(error);
  }
};

module.exports = { createCourse, getCourses, enrollCourse, getCourseVideos };
