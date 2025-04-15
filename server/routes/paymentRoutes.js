// routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const { createCheckoutSession, handleStripeWebhook } = require('../controllers/paymentController');
const { protect } = require('../middlewares/authMiddleware');

// Create checkout session (SkillSwappers purchasing courses)
router.post('/create-checkout-session', protect, createCheckoutSession);

// Stripe webhook endpoint (public route)
router.post('/webhook', express.raw({ type: 'application/json' }), handleStripeWebhook);

module.exports = router;
