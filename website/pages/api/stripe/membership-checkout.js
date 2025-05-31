import { countries } from '~/lib/stripe/country-alpha-codes';
import { trackInitiateCheckout } from '~/lib/meta/conversions-api';
import { getActiveMembership } from '~/lib/sanity/requests';
import { getCurrencySymbol } from '~/lib/utils/currency';
import { getRegionalPricing } from '~/lib/utils/regional-pricing';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

function getRegionalPricingForMembership(membership, customerCountry) {
  const pricing = membership.regionalPricing;

  if (!pricing) {
    throw new Error('Membership missing regional pricing configuration');
  }

  const { price, currency, region } = getRegionalPricing(
    pricing,
    customerCountry
  );

  return {
    price: Math.round(price * 100), // Convert to smallest currency unit for Stripe
    currency,
    region,
  };
}

export default async function handler(req, res) {
  try {
    if (req.method === 'POST') {
      const {
        customerCountry,
        isTrial = false, // @why: Support for trial periods if needed in future
      } = req.body;

      // Fetch active membership data from Sanity CMS
      const membership = await getActiveMembership();

      if (!membership) {
        return res.status(404).json({ error: 'No active membership found' });
      }

      // Get regional pricing based on customer country
      const regionalPricing = getRegionalPricingForMembership(
        membership,
        customerCountry
      );

      // Create subscription session using dynamic pricing attached to existing product
      const session = await stripe.checkout.sessions.create({
        billing_address_collection: 'required', // @why: Required billing address for subscription
        shipping_address_collection: {
          allowed_countries: countries, // @why: Makes shipping address mandatory for membership magazines
        },
        line_items: [
          {
            price_data: {
              currency: regionalPricing.currency.toLowerCase(), // @why: Use regional currency
              product: 'prod_QjWWQBx6mJpOPq', // @why: Use existing Stripe product to maintain continuity
              unit_amount: regionalPricing.price, // @why: CMS-driven regional price
              recurring: {
                interval: 'month', // @why: Monthly subscription billing
              },
            },
            quantity: 1,
          },
        ],
        mode: 'subscription', // @why: Different from products which use 'payment'
        phone_number_collection: { enabled: true }, // @why: Phone number is required when enabled
        allow_promotion_codes: true, // @why: Enable coupon/discount codes for memberships
        success_url: `${req.headers.origin}/membership/thank-you?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/membership`,
        metadata: {
          membership_id: membership._id,
          membership_title: membership.title,
          customer_region: regionalPricing.region,
          customer_country: customerCountry || 'unknown',
          is_trial: isTrial.toString(),
        },
        subscription_data: {
          metadata: {
            membership_id: membership._id,
            customer_region: regionalPricing.region,
            customer_country: customerCountry || 'unknown',
          },
        },
      });

      // Track Meta Pixel InitiateCheckout event
      try {
        await trackInitiateCheckout({
          sessionUrl: session.url,
          priceId: 'cms_dynamic_subscription_price', // @why: Consistent with product checkout tracking
          quantity: 1,
          mode: 'subscription',
          userAgent: req.headers['user-agent'],
          clientIp:
            req.headers['x-forwarded-for'] || req.connection.remoteAddress,
        });
      } catch (metaError) {
        console.error(
          'Meta Conversions API InitiateCheckout error:',
          metaError
        );
      }

      return res.status(200).json({
        url: session.url,
        debug: {
          membershipTitle: membership.title,
          region: regionalPricing.region,
          currency: regionalPricing.currency,
          price: `${getCurrencySymbol(regionalPricing.currency)}${(
            regionalPricing.price / 100
          ).toFixed(2)}/month`, // @why: Convert back to display format
        },
      });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Error in /api/stripe/membership-checkout:', error);
    return res.status(500).json({ error: error.message });
  }
}
