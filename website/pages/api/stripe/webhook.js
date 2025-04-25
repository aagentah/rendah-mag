// pages/api/stripe/webhook.js

import { buffer } from 'micro';
import { Stripe } from 'stripe';
import fetch from 'isomorphic-unfetch';

import formatHttpError from '~/functions/formatHttpError';
import orderCompleted from '~/lib/stripe/order-completed';
import subscriptionCreated from '~/lib/stripe/subscription-created';
import subscriptionCancelled from '~/lib/stripe/subscription-cancelled';
import receiptEmail from '~/lib/emails/order-receipt';

// Final-retry helpers
import {
  fetchCustomerEmail,
  sendFinalRetryEmail,
} from '~/lib/stripe/final-retry';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27',
});
const endpointSecret = process.env.STRIPE_SIGNING_SECRET;

export const config = {
  api: { bodyParser: false },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end('Method Not Allowed');
  }

  let event;
  try {
    const payload = await buffer(req);
    const sig = req.headers['stripe-signature'];
    event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
  } catch (err) {
    console.error('⚠️ Webhook signature error:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  const obj = event.data.object;

  try {
    switch (event.type) {
      // ─── New orders & subscriptions ───────────────────────────────────
      case 'checkout.session.completed': {
        const session = obj;
        const { customer_details, customer, shipping } = session;

        const lineItems = await stripe.checkout.sessions.listLineItems(
          session.id,
          { limit: 100 }
        );
        const products = lineItems.data.map((i) => ({
          name: i.description,
          quantity: i.quantity,
        }));

        await orderCompleted({ session, products });
        await receiptEmail({
          email: customer_details.email,
          name: shipping.name,
          products,
          session,
        });

        if (session.mode === 'subscription') {
          await subscriptionCreated({
            username: customer_details.email,
            name: shipping.name,
            stripeCustomerId: customer,
            address: {
              line1: shipping.address.line1 || '',
              line2: shipping.address.line2 || '',
              city: shipping.address.city || '',
              postal_code: shipping.address.postal_code || '',
              state: shipping.address.state || '',
              country: shipping.address.country,
            },
          });
        }
        break;
      }

      // ─── Subscription cancellations ────────────────────────────────────
      case 'subscription_schedule.canceled':
      case 'customer.subscription.deleted': {
        const email = await fetchCustomerEmail(obj.customer);
        await subscriptionCancelled({ email });
        break;
      }

      // ─── Failed-payment dunning (8th retry) ───────────────────────────
      case 'invoice.payment_failed': {
        const { attempt_count: count, customer, created } = obj;
        if (count === 8) {
          const email = await fetchCustomerEmail(customer);
          await sendFinalRetryEmail(email, count, created);
        }
        break;
      }

      // ─── Unhandled events ─────────────────────────────────────────────
      default:
        // Optionally log: console.log(`Unhandled event type: ${event.type}`);
        break;
    }

    return res.status(200).json({ received: true });
  } catch (err) {
    console.error('💥 Handler error:', err);
    return res.status(500).json({ error: err.message });
  }
}
