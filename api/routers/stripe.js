import express from 'express';
import Stripe from 'stripe';

// Replace this with your actual Stripe secret key
const STRIPE_SECRET_KEY = 'sk_test_51Pv0ZZRvoIfHJArlNIHoN7EjnGbjAHJP0cE89vETbjkeWQQBGcsmaKqwyCRLqIn2tSKdEo41eB36QeGmnYZTntMo00C4HgOpXi';

const router = express.Router();
const stripe = new Stripe(STRIPE_SECRET_KEY);

router.post('/payment', async (req, res) => {
  try {
    const { tokenId, amount } = req.body;

    // Create a charge
    const charge = await stripe.charges.create({
      source: tokenId,
      amount: amount,
      currency: 'usd',
    });

    // Respond with the charge details
    res.status(200).json(charge);
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: error.message });
  }
});

export default router;
