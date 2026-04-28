const express = require('express');
const asyncHandler = require('express-async-handler');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/create-checkout-session', protect, asyncHandler(async (req, res) => {
  if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY.includes('replace')) {
    return res.status(400).json({ message: 'Stripe not configured. Use COD or set STRIPE_SECRET_KEY.' });
  }
  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
  const { items, orderId } = req.body;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: items.map((it) => ({
      price_data: {
        currency: 'inr',
        product_data: { name: it.name, images: it.image ? [it.image] : [] },
        unit_amount: Math.round(it.price * 100),
      },
      quantity: it.qty,
    })),
    mode: 'payment',
    success_url: `${process.env.CLIENT_URL}/order/${orderId}?paid=true`,
    cancel_url: `${process.env.CLIENT_URL}/cart`,
    metadata: { orderId },
  });

  res.json({ url: session.url, id: session.id });
}));

module.exports = router;
