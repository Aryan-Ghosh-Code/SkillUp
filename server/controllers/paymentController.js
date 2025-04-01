// controllers/paymentController.js
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Course = require('../models/Course');
const User = require('../models/User');

const createPaymentIntent = async (req, res, next) => {
  try {
    const { courseId } = req.body;

    // Fetch the course to get its price
    const course = await Course.findById(courseId);
    if (!course) {
      res.status(404);
      throw new Error('Course not found');
    }

    // Create a PaymentIntent with the course price (assuming price is in INR)
    // Note: Stripe expects amounts in the smallest currency unit (e.g., paise for INR).
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(course.price * 100), // converting rupees to paise
      currency: 'inr',
      // Optionally include metadata for later reference:
      metadata: { courseId: course._id.toString(), mentorId: course.mentor.toString() }
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    next(error);
  }
};

const confirmEnrollment = async (req, res, next) => {
    try {
      const { courseId } = req.body;
      const user = await User.findById(req.user._id);
      if (!user) {
        res.status(404);
        throw new Error("User not found");
      }
      // Add courseId if not already enrolled
      if (!user.enrolledCourses.includes(courseId)) {
        user.enrolledCourses.push(courseId);
        await user.save();
      }
      // Update course enrollments count
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

module.exports = { createPaymentIntent, confirmEnrollment };
