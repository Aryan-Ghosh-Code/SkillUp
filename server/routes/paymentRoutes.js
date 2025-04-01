// routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const { createPaymentIntent, confirmEnrollment } = require('../controllers/paymentController');
const { protect } = require('../middlewares/authMiddleware');

// Route to create payment intent
router.post('/create', protect, createPaymentIntent);

// Route to confirm enrollment after successful payment
router.post('/confirm', protect, confirmEnrollment);

module.exports = router;
