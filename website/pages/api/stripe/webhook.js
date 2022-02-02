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
      throw new Error();
    }

    const payload = await buffer(req);
    const sig = req.headers['stripe-signature'];
    let event;
    let customerRes;
    let session;

    console.log('xxx', payload, sig, endpointSecret);

    try {
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (err) {
      throw new Error(await formatHttpError(err.message));
    }

    session = event?.data?.object;

    console.log('session', session);

    // console.log('session', session);

    switch (event.type) {
      case 'checkout.session.completed':
        // console.log('checkout.session.completed', session);

        console.log('1');

        await orderCompleted({ session });

        console.log('2');

        if (session.mode === 'subscription') {
          await subscriptionCreated({ session });
        }

        break;
      case 'subscription_schedule.canceled':
        // console.log('subscription_schedule.canceled', session);

        await subscriptionCancelled({ session });

        break;
      case 'customer.subscription.deleted':
        // console.log('subscription_schedule.canceled', session);

        await subscriptionCancelled({ session });

        break;
      default:

      // console.log(`Unhandled event type ${event.type}`);
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
