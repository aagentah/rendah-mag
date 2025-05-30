import crypto from 'crypto';
import { generateEventId as clientGenerateEventId } from '../utils/event-id.js';

const META_PIXEL_ID = '2984009378374748'; // Your existing pixel ID
const META_ACCESS_TOKEN = process.env.META_ACCESS_TOKEN; // The token you provided
const META_API_VERSION = 'v21.0';
const META_API_URL = `https://graph.facebook.com/${META_API_VERSION}/${META_PIXEL_ID}/events`;

/**
 * Hash customer data for privacy compliance
 * @why: Meta requires hashing of PII data for privacy compliance
 */
function hashUserData(data) {
  if (!data) return null;
  return crypto
    .createHash('sha256')
    .update(data.toLowerCase().trim())
    .digest('hex');
}

/**
 * Generate event ID for deduplication between pixel and server events
 * @why: Ensures browser pixel and server events don't create duplicates by using same algorithm
 */
function generateEventId(prefix, orderId, timestamp) {
  // Use the same algorithm as client-side for proper deduplication
  return clientGenerateEventId(prefix, orderId, timestamp);
}

/**
 * Send event to Meta Conversions API
 * @why: Centralized function for all server-side Meta event tracking
 */
async function sendConversionsAPIEvent(eventData, testEventCode = null) {
  if (!META_ACCESS_TOKEN) {
    console.warn('[Meta Conversions API] No access token configured');
    return { success: false, error: 'No access token' };
  }

  const payload = {
    data: [eventData],
    partner_agent: 'rendah-mag-server-v1.0',
  };

  // Add test event code if provided
  if (testEventCode) {
    payload.test_event_code = testEventCode;
  }

  try {
    const response = await fetch(
      `${META_API_URL}?access_token=${META_ACCESS_TOKEN}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      console.error('[Meta Conversions API] Error:', result);
      return { success: false, error: result.error?.message || 'API error' };
    }

    console.log(
      '[Meta Conversions API] Event sent successfully:',
      eventData.event_name
    );
    return { success: true, data: result };
  } catch (error) {
    console.error('[Meta Conversions API] Network error:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Track Purchase event from Stripe checkout completion
 * @why: More accurate than browser tracking, includes rich customer data
 */
export async function trackPurchase({
  session,
  products,
  testEventCode = null,
}) {
  const {
    customer_details,
    shipping,
    amount_total,
    currency,
    id: sessionId,
    created,
  } = session;

  // Generate event ID for deduplication with browser pixel
  const eventId = generateEventId('purchase', sessionId, created);

  const eventData = {
    event_name: 'Purchase',
    event_time: created,
    event_id: eventId,
    action_source: 'website',
    event_source_url: `${process.env.SITE_URL}/membership/thank-you?order=${sessionId}&success=1`,
    user_data: {
      em: customer_details.email ? [hashUserData(customer_details.email)] : [],
      ph: customer_details.phone ? [hashUserData(customer_details.phone)] : [],
      fn: shipping?.name ? [hashUserData(shipping.name.split(' ')[0])] : [],
      ln: shipping?.name
        ? [hashUserData(shipping.name.split(' ').slice(1).join(' '))]
        : [],
      ct: shipping?.address?.city ? [hashUserData(shipping.address.city)] : [],
      st: shipping?.address?.state
        ? [hashUserData(shipping.address.state)]
        : [],
      zp: shipping?.address?.postal_code
        ? [hashUserData(shipping.address.postal_code)]
        : [],
      country: shipping?.address?.country
        ? [hashUserData(shipping.address.country)]
        : [],
      client_user_agent: 'server-side-tracking', // @why: Required field for server events
    },
    custom_data: {
      currency: currency.toUpperCase(),
      value: (amount_total / 100).toFixed(2), // Convert from cents to currency
      content_type: session.mode === 'subscription' ? 'membership' : 'product',
      content_ids: products.map((p) => p.name),
      contents: products.map((p) => ({
        id: p.name,
        quantity: p.quantity,
        delivery_category: 'home_delivery',
      })),
      num_items: products.reduce((sum, p) => sum + p.quantity, 0),
    },
    original_event_data: {
      event_name: 'Purchase',
      event_time: created,
    },
  };

  return await sendConversionsAPIEvent(eventData, testEventCode);
}

/**
 * Track InitiateCheckout event when Stripe checkout session is created
 * @why: More reliable than browser tracking for cart abandonment analysis
 */
export async function trackInitiateCheckout({
  sessionUrl,
  priceId,
  quantity,
  mode,
  userAgent,
  clientIp,
  testEventCode = null,
}) {
  const timestamp = Math.floor(Date.now() / 1000);
  const eventId = generateEventId('initiate_checkout', priceId, timestamp);

  const eventData = {
    event_name: 'InitiateCheckout',
    event_time: timestamp,
    event_id: eventId,
    action_source: 'website',
    event_source_url: sessionUrl || `${process.env.SITE_URL}/membership`,
    user_data: {
      client_ip_address: clientIp,
      client_user_agent: userAgent,
    },
    custom_data: {
      currency: 'GBP',
      content_type: mode === 'subscription' ? 'membership' : 'product',
      content_ids: [priceId],
      num_items: quantity,
    },
    original_event_data: {
      event_name: 'InitiateCheckout',
      event_time: timestamp,
    },
  };

  return await sendConversionsAPIEvent(eventData, testEventCode);
}

/**
 * Track PageView event for important pages
 * @why: Provides backup data when browser pixels are blocked
 */
export async function trackPageView({
  url,
  userAgent,
  clientIp,
  userId = null,
  testEventCode = null,
}) {
  const timestamp = Math.floor(Date.now() / 1000);
  const eventId = generateEventId('pageview', url, timestamp);

  const eventData = {
    event_name: 'PageView',
    event_time: timestamp,
    event_id: eventId,
    action_source: 'website',
    event_source_url: url,
    user_data: {
      client_ip_address: clientIp,
      client_user_agent: userAgent,
      ...(userId && { external_id: [hashUserData(userId)] }),
    },
    original_event_data: {
      event_name: 'PageView',
      event_time: timestamp,
    },
  };

  return await sendConversionsAPIEvent(eventData, testEventCode);
}

/**
 * Get event ID for client-side deduplication
 * @why: Allows browser pixel to use same event ID for deduplication
 */
export function getEventIdForClient(eventType, identifier, timestamp) {
  return generateEventId(eventType, identifier, timestamp);
}

// CommonJS compatibility for test scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    trackPurchase,
    trackInitiateCheckout,
    trackPageView,
    getEventIdForClient,
  };
}
