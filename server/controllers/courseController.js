// controllers/courseController.js
const Course = require('../models/Course');
const Profile = require('../models/Profile');
const User = require('../models/User');

/**
 * @desc   Create a new course (Mentor uploads course)
 * @route  POST /api/courses/create
 * @access Private (Mentors only)
 */
exports.createCourse = async (req, res) => {
  try {
    const { title, description, price, category, videoUrl } = req.body;
    const userId = req.user.id;

    // Create a new course document with the provided fields
    const course = new Course({
      title,
      description,
      price,
      category,
      videoUrl,
      mentor: userId
    });

    // Save the course to the database
    await course.save();

    const profile = await Profile.findOne({ userId });
    profile.offeredCourses.push(course._id);
    profile.save();

    res.status(201).json({ msg: 'Course created successfully', course });
  } catch (error) {
    console.error('Course Creation Error:', error);
    res.status(500).json({ msg: 'Server Error: Unable to create course' });
  }
};

/**
 * @desc   Purchase a course (via Stripe payment success callback)
 * @route  POST /api/courses/purchase/:courseId
 * @access Private (SkillSwappers)
 */
exports.purchaseCourse = async (req, res) => {
  try {
    const userId = req.user.id;
    const courseId = req.params.courseId;

    // In a real-world scenario you would create a Stripe Checkout session here
    // After successful payment, you would update the course and user records accordingly.
    // For demonstration purposes, assume payment succeeded:
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(400).json({ msg: 'Course not found' });
    }

    if (course.mentor.equals(userId)) {
      return res.status(400).json({ msg: 'You cannot enroll in your own Course' });
    }

    // Add the user to the list of enrolled users in the course document
    course.enrolledUsers.push(userId);

    // Update the user's profile with the purchased course
    const profile = await Profile.findOne({ userId });
    profile.purchasedCourses.push(course._id);

    await Promise.all([course.save(), profile.save()]);

    res.status(200).json({ msg: 'Course purchased successfully', course });
  } catch (error) {
    console.error('Course Purchase Error:', error);
    res.status(500).json({ msg: 'Server Error: Unable to purchase course' });
  }
};

/**
 * @desc   Get all available courses
 * @route  GET /api/courses
 * @access Public
 */
exports.getAllCourses = async (req, res) => {
  try {
    // Find all courses and populate the "mentor" field to show mentor names
    const courses = await Course.find().populate('mentor', 'name');
    res.status(200).json(courses);
  } catch (error) {
    console.error('Get Courses Error:', error);
    res.status(500).json({ msg: 'Server Error: Unable to fetch courses' });
  }
};

exports.getMyEnrolledCourses = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate({
      path: 'profile',
      populate: {
        path: 'purchasedCourses',
        model: 'Course',
        populate: {
          path: 'mentor',
          model: 'User',
          select: 'name'
        }
      }
    });

    res.status(200).json(user.profile.purchasedCourses);
  } catch (error) {
    console.error('My Enrolled Sessions Error:', error);
    res.status(500).json({ error: 'Server Error: Unable to fetch enrolled sessions' });
  }
};
