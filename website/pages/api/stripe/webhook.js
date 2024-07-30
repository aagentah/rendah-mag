import { buffer } from 'micro';
import { Stripe } from 'stripe';
import fetch from 'isomorphic-unfetch';

import formatHttpError from '~/functions/formatHttpError';

import orderCompleted from '~/lib/stripe/order-completed';
import subscriptionCreated from '~/lib/stripe/subscription-created';
import subscriptionCancelled from '~/lib/stripe/subscription-cancelled';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2020-08-27',
});

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
    let email;

    try {
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (err) {
      throw new Error(await formatHttpError(err.message));
    }

    session = event?.data?.object;

    const getEmail = async () => {
      const response = await fetch(
        `${process.env.SITE_URL}/api/stripe/get-customer`,
        {
          body: JSON.stringify({ stripeCustomerId: session.customer }),
          headers: { 'Content-Type': 'application/json' },
          method: 'POST',
        }
      );

      if (!response.ok) {
        throw new Error(await formatHttpError(response));
      }

      const customerRes = await response.json();
      const { customer } = customerRes;

      email = customer.email;
      return true;
    };

    switch (event.type) {
      case 'checkout.session.completed':
        const { customer_details, customer } = session;
        const { shipping } = session;
        const { address } = shipping;
        const { line1, line2, city, postal_code, state, country } = address;

        const lineItems = await stripe.checkout.sessions.listLineItems(
          session.id,
          { limit: 100 }
        );

        const products = lineItems.data.map((item) => ({
          name: item.description,
          quantity: item.quantity,
        }));

        console.log('session, products', session, products);

        await orderCompleted({ session, products });

        if (session.mode === 'subscription') {
          await subscriptionCreated({
            username: customer_details.email,
            name: shipping.name,
            stripeCustomerId: customer,
            address: {
              line1: address?.line1 ? line1 : '',
              line2: address?.line2 ? line2 : '',
              city: address?.city ? city : '',
              postal_code: address?.postal_code ? postal_code : '',
              state: address?.state ? state : '',
              country: address?.country ? country : '',
            },
          });
        }

        break;
      case 'subscription_schedule.canceled':
      case 'customer.subscription.deleted':
        await getEmail();
        await subscriptionCancelled({ email });
        break;
      default:
        break;
    }

    return res.status(200).json({ error: '' });
  } catch (error) {
    console.error('Error in /api/stripe/payment-succeeded', error);
    return res.status(500).json({ error });
  }
};

export const config = {
  api: {
    bodyParser: false,
  },
};
