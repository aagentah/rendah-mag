import { countries } from '~/lib/stripe/country-alpha-codes';
import { trackInitiateCheckout } from '~/lib/meta/conversions-api';
import { getProduct } from '~/lib/sanity/requests';
import { getCurrencySymbol } from '~/lib/utils/currency';
import {
  getRegionalPricing,
  getRegionalShipping,
} from '~/lib/utils/regional-pricing';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

function getRegionalPricingForProduct(product, customerCountry) {
  const pricing = product.regionalPricing;

  if (!pricing) {
    throw new Error('Product missing regional pricing configuration');
  }

  const { price, currency, region } = getRegionalPricing(
    pricing,
    customerCountry
  );

  return {
    price: Math.round(price * 100), // Convert to smallest currency unit
    currency,
    region,
  };
}

export default async function handler(req, res) {
  try {
    if (req.method === 'POST') {
      const {
        productSlug, // Product slug to lookup in Sanity
        quantity = 1,
        customerCountry,
      } = req.body;

      if (!productSlug) {
        return res.status(400).json({ error: 'Product slug is required' });
      }

      // Fetch product data from Sanity CMS
      const product = await getProduct(productSlug);

      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }

      // Check if product is sold out
      if (product.tag === 'Sold-out') {
        return res.status(400).json({ error: 'Product is sold out' });
      }

      // Get regional pricing based on customer country
      const regionalPricing = getRegionalPricingForProduct(
        product,
        customerCountry
      );

      // Get regional shipping options based on customer country
      const shippingOptions = getRegionalShipping(
        product.regionalShipping,
        customerCountry
      );

      // Create line items using CMS-driven pricing
      const lineItems = [
        {
          price_data: {
            currency: regionalPricing.currency.toLowerCase(), // Use regional currency
            ...(product.stripeProductId
              ? { product: product.stripeProductId } // @why: Use existing Stripe product if specified in CMS
              : {
                  product_data: {
                    name: product.title,
                    // You can add more product data here like images, description, etc.
                  },
                }), // @why: Create new product if no Stripe Product ID specified
            unit_amount: regionalPricing.price, // CMS-driven regional price
          },
          quantity: quantity,
        },
      ];

      const session = await stripe.checkout.sessions.create({
        shipping_address_collection: {
          allowed_countries: countries,
        },
        shipping_options: shippingOptions,
        line_items: lineItems,
        mode: 'payment',
        phone_number_collection: { enabled: true },
        allow_promotion_codes: true,
        success_url: `${req.headers.origin}/product/thank-you?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/product/${productSlug}`,
        metadata: {
          product_slug: productSlug,
          product_title: product.title,
          customer_region: regionalPricing.region,
          customer_country: customerCountry || 'unknown',
        },
      });

      try {
        await trackInitiateCheckout({
          sessionUrl: session.url,
          priceId: 'cms_dynamic_price',
          quantity: quantity,
          mode: 'payment',
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
          productTitle: product.title,
          region: regionalPricing.region,
          currency: regionalPricing.currency,
          price: `${getCurrencySymbol(regionalPricing.currency)}${(
            regionalPricing.price / 100
          ).toFixed(2)}`,
          shippingOptionsCount: shippingOptions.length,
        },
      });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Error in /api/stripe/product-checkout:', error);
    return res.status(500).json({ error: error.message });
  }
}
