// controllers/paymentController.js
const Stripe = require('stripe');
const Course = require('../models/Course');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY || 'your_stripe_secret_key');

/**
 * @desc   Create a Stripe Checkout session for course purchase
 * @route  POST /api/payments/create-checkout-session
 * @access Private
 *
 * This endpoint is called from the frontend when a user decides to purchase a course.
 * It creates a Stripe Checkout session with the course details.
 */
exports.createCheckoutSession = async (req, res) => {
  try {
    const { courseId } = req.body;
    const course = await Course.findById(courseId);

    // Create a Stripe checkout session using the course details
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: `Course Purchased: ${course.title}`,
            description: `Course Id: ${courseId} | Mentor: ${course.mentor} | Category: ${course.category}`
          },
          unit_amount: course.price,
        },
        quantity: 1,
      }],
      mode: 'payment',
      // success_url will have the session ID and courseId to allow the frontend to update records after payment
      success_url: `${process.env.CLIENT_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}&courseId=${courseId}`,
      // URL where the user will be redirected if they cancel the payment
      cancel_url: `${process.env.CLIENT_URL}/payment-cancel`,
    });

    res.status(200).json({
      sessionId: session.id,
      url: session.url
    });
  } catch (error) {
    console.error('Stripe Session Creation Error:', error);
    res.status(500).json({ msg: 'Server Error: Unable to create Stripe session' });
  }
};

/**
 * @desc   Webhook endpoint for Stripe events
 * @route  POST /api/payments/webhook
 * @access Public (Stripe will call this endpoint)
 *
 * This endpoint listens for events from Stripe. When a payment is successful,
 * you can use this endpoint to trigger order fulfillment such as updating user/course records.
 */
exports.handleStripeWebhook = (req, res) => {
  // In a production scenario, verify the event by checking the Stripe signature header and using your raw request body
  let event;
  try {
    // The raw body of the request and Stripe signature header are used for verifying the event.
    event = req.body;
  } catch (err) {
    console.error('Webhook Error:', err);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Example: Handle the checkout session completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    // You could run business logic here such as calling your purchaseCourse controller function,
    // updating your database to mark the course as purchased, or sending a confirmation email.
    console.log(`Payment succeeded for session: ${session.id}`);
  }

  // Respond to acknowledge receipt of the event
  res.json({ received: true });
};
