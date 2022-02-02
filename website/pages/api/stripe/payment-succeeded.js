import fetch from 'isomorphic-unfetch';
import { buffer } from 'micro';
import { Stripe } from 'stripe';

import formatHttpError from '~/functions/formatHttpError';

import orderCompleted from '~/lib/stripe/order-completed';
import subscriptionCreated from '~/lib/stripe/subscription-created';
import subscriptionCancelled from '~/lib/stripe/subscription-cancelled';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_SIGNING_SECRET;

export default async (req, res) => {
  try {
    if (req.method !== 'POST') {
      throw new Error(await formatHttpError(response));
    }

    const payload = await buffer(req);
    const sig = req.headers['stripe-signature'];
    let event;
    let session;
    let customerRes;

    try {
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (err) {
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    switch (event.type) {
      case 'checkout.session.completed':
        session = event.data.object;

        await orderCompleted({ session });
        if (session.subscription) await subscriptionCreated({ session });
        break;
      case 'subscription_schedule.canceled':
        session = event.data.object;

        await subscriptionCancelled({ session });
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Success
    return res.status(200).json({ error: '' });
  } catch (error) {
    // Handle catch
    console.error('Error in /api/stripe/payment-succeeded', error);
    return res.status(500).json({ error });
  }
};

export const config = {
  api: {
    bodyParser: false,
  },
};
