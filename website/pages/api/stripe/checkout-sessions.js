import { countries } from '~/lib/stripe/country-alpha-codes';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  try {
    if (req.method === 'POST') {
      const { data } = req.body;
      const { shipping } = data;
      let shippingOptions;
      let discountOptions;

      if (data.discount) {
        const coupon = await stripe.promotionCodes.list({
          limit: 1,
          code: data.discount,
        });

        discountOptions = [{ coupon: coupon.data[0].coupon.id }];
      }

      if (data.mode === 'payment') {
        shippingOptions = [
          {
            shipping_rate_data: {
              type: 'fixed_amount',
              fixed_amount: { amount: shipping.uk, currency: 'gbp' },
              display_name: 'UK Shipping',
              delivery_estimate: {
                minimum: { unit: 'business_day', value: 1 },
                maximum: { unit: 'business_day', value: 4 },
              },
            },
          },
          {
            shipping_rate_data: {
              type: 'fixed_amount',
              fixed_amount: { amount: shipping.europe, currency: 'gbp' },
              display_name: 'Europe Shipping',
              delivery_estimate: {
                minimum: { unit: 'business_day', value: 5 },
                maximum: { unit: 'business_day', value: 10 },
              },
            },
          },
          {
            shipping_rate_data: {
              type: 'fixed_amount',
              fixed_amount: { amount: shipping.worldwide, currency: 'gbp' },
              display_name: 'Worldwide Shipping',
              delivery_estimate: {
                minimum: { unit: 'business_day', value: 7 },
                maximum: { unit: 'business_day', value: 14 },
              },
            },
          },
        ];
      }

      const session = await stripe.checkout.sessions.create({
        shipping_address_collection: { allowed_countries: countries },
        shipping_options: shippingOptions,
        line_items: [{ price: data.priceId, quantity: data.quantity }],
        mode: data.mode,
        discounts: discountOptions,
        phone_number_collection: { enabled: true },
        success_url: `${req.headers.origin}${data.successUrl}`,
        cancel_url: `${req.headers.origin}${data.cancelUrl}`,
      });

      return res.status(200).json({ url: session.url });
    }

    return res.status(200).json({ error: '' });
  } catch (error) {
    // Handle catch
    console.error('Error in /api/stripe/checkout-sessions', error);
    return res.status(500).json({ error });
  }
}
