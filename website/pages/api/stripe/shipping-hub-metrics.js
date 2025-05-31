// pages/api/shipping-hub-metrics.js

import Stripe from 'stripe';
import fetch from 'node-fetch'; // If your environment doesn't have global fetch

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const EASYSHIP_API_URL = 'https://public-api.easyship.com/2024-09/rates';
const EASYSHIP_API_KEY = 'prod_32OOMNIPUBjWB9hehMTp1uSEr0sR04zbdYphoNO3WPY=';

// --- Origin addresses for each hub
const ORIGINS = {
  UK: {
    country: 'GB',
    state: '',
    city: 'London',
    postal_code: 'E1 6AN',
    address: '1 Club Row',
  },
  DE: {
    country: 'DE',
    state: '',
    city: 'Berlin',
    postal_code: '10115',
    address: 'Invalidenstraße 116',
  },
  US: {
    country: 'US',
    state: 'NY',
    city: 'New York',
    postal_code: '10001',
    address: '123 8th Ave',
  },
};

// --- Continent / region definitions
const REGION_COUNTRIES = {
  Europe: [
    // EU member states (excl. GB, DE), plus CH, NO, LI
    'AT',
    'BE',
    'BG',
    'HR',
    'CY',
    'CZ',
    'DK',
    'EE',
    'FI',
    'FR',
    'GR',
    'HU',
    'IE',
    'IT',
    'LV',
    'LT',
    'LU',
    'MT',
    'NL',
    'PL',
    'PT',
    'RO',
    'SK',
    'SI',
    'ES',
    'SE',
    'CH',
    'NO',
    'LI',
  ],
  'North America': ['CA', 'MX'],
  'South America': ['BR', 'AR', 'CL', 'CO', 'PE', 'UY', 'EC', 'BO', 'PY', 'VE'],
  Africa: ['ZA', 'NG', 'EG', 'KE', 'MA', 'DZ', 'GH', 'TZ', 'UG', 'SN'],
  Asia: [
    'JP',
    'CN',
    'IN',
    'KR',
    'SG',
    'TH',
    'MY',
    'ID',
    'PH',
    'VN',
    'HK',
    'TW',
  ],
  Oceania: ['AU', 'NZ', 'FJ', 'PG', 'SB', 'VU'],
};

// --- Static representative destination addresses per region
const REGION_DEST_ADDRESSES = {
  Europe: {
    country: 'DE',
    state: '',
    city: 'Berlin',
    postal_code: '10115',
    address: 'Invalidenstraße 116',
  },
  'North America': {
    country: 'US',
    state: 'NY',
    city: 'New York',
    postal_code: '10001',
    address: '123 8th Ave',
  },
  'South America': {
    country: 'BR',
    state: 'SP',
    city: 'São Paulo',
    postal_code: '01000-000',
    address: 'Av. Paulista, 1000',
  },
  Africa: {
    country: 'ZA',
    state: 'GP',
    city: 'Johannesburg',
    postal_code: '2000',
    address: '1 Mandela St',
  },
  Asia: {
    country: 'JP',
    state: '',
    city: 'Tokyo',
    postal_code: '100-0001',
    address: 'Chiyoda, 1-1',
  },
  Oceania: {
    country: 'AU',
    state: 'NSW',
    city: 'Sydney',
    postal_code: '2000',
    address: 'George St',
  },
};

// --- Simplified skip rules: hub → regions it never serves
const SKIP_HUB_REGION = {
  US: ['Europe'],
  UK: ['North America'],
  DE: ['North America'],
};

// Map hubs to their own country codes
const HUB_COUNTRY = { UK: 'GB', DE: 'DE', US: 'US' };

// --- In-memory cache for rate lookups (TTL = 1 hour)
const rateCache = new Map();
const CACHE_TTL = 1000 * 60 * 60;

/**
 * Fetches the cheapest Easyship rate, using an in-memory cache.
 */
async function getCheapestRateCached(hub, origin, destination) {
  const key = `${hub}-${destination.country}`;
  const now = Date.now();
  const cached = rateCache.get(key);
  if (cached && now - cached.timestamp < CACHE_TTL) {
    return cached.rate;
  }
  const rate = await fetchCheapestRate(origin, destination);
  rateCache.set(key, { rate, timestamp: now });
  return rate;
}

/**
 * Calls Easyship API and returns the cheapest rate object (or null).
 */
async function fetchCheapestRate(origin, destination) {
  const payload = {
    origin_address: {
      line_1: origin.address,
      country_alpha2: origin.country,
      state: origin.state,
      city: origin.city,
      postal_code: origin.postal_code,
    },
    destination_address: {
      line_1: destination.address,
      country_alpha2: destination.country,
      state: destination.state,
      city: destination.city,
      postal_code: destination.postal_code,
    },
    shipping_settings: {
      units: { weight: 'kg', dimensions: 'cm' },
    },
    parcels: [
      {
        box: { length: 32.4, width: 22.9, height: 1 },
        total_actual_weight: 0.5,
        items: [
          {
            quantity: 1,
            declared_currency: 'GBP',
            declared_customs_value: 15,
            hs_code: '4902.90',
            category: 'Art Print',
            description: 'Art Print',
            origin_country_alpha2: origin.country,
          },
        ],
      },
    ],
  };

  const res = await fetch(EASYSHIP_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${EASYSHIP_API_KEY}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    console.error('[Easyship] API error:', res.status, await res.text());
    return null;
  }
  const data = await res.json();
  if (!Array.isArray(data.rates) || data.rates.length === 0) {
    console.warn('[Easyship] No rates for', destination);
    return null;
  }
  return data.rates.reduce(
    (min, r) => (r.total_charge < min.total_charge ? r : min),
    data.rates[0]
  );
}

/**
 * Normalize a Stripe shipping address object.
 */
function normalizeStripeAddress(addr) {
  if (!addr) return null;
  return {
    country: addr.country,
    state: addr.state || '',
    city: addr.city || '',
    postal_code: addr.postal_code || '',
    address: [addr.line1, addr.line2].filter(Boolean).join(', '),
  };
}

export default async function handler(req, res) {
  // --- CORS and method guards
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3333');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET')
    return res.status(405).json({ error: 'Method not allowed' });

  // --- 1. Fetch all active Stripe subscriptions (with expanded customer)
  let subscriptions = [];
  let hasMore = true;
  let startingAfter;
  while (hasMore) {
    const resp = await stripe.subscriptions.list({
      status: 'active',
      expand: ['data.customer'],
      limit: 100,
      ...(startingAfter && { starting_after: startingAfter }),
    });
    subscriptions = subscriptions.concat(resp.data);
    hasMore = resp.has_more;
    // Only update startingAfter if we actually got results; otherwise, break to avoid infinite loop or missing data (see: Stripe API edge case)
    if (hasMore && resp.data.length > 0) {
      startingAfter = resp.data[resp.data.length - 1].id;
    } else {
      break; // Defensive: break if no more data to paginate.
    }
  }
  // @why: Log the number of subscriptions fetched before filtering for debugging
  console.log(
    '[shipping-hub-metrics] Total subscriptions fetched:',
    subscriptions.length
  );

  // --- 2. Extract customer shipping addresses
  // @why: Fallback to fetching customer from Stripe if expanded customer object has no shipping address, and then fallback to billing address if no shipping address
  const billingFallbacks = [];
  const addresses = await Promise.all(
    subscriptions.map(async (sub) => {
      const cust = sub.customer;
      if (cust?.shipping?.address) {
        return {
          id: cust.id,
          name: cust.shipping.name,
          address: normalizeStripeAddress(cust.shipping.address),
          email: cust.email,
          subscriptionId: sub.id,
          addressSource: 'shipping', // @why: Mark source for transparency
        };
      }
      // Fallback: fetch customer from Stripe if not present or not expanded
      try {
        const fetched = await stripe.customers.retrieve(cust.id);
        if (fetched?.shipping?.address) {
          return {
            id: fetched.id,
            name: fetched.shipping.name,
            address: normalizeStripeAddress(fetched.shipping.address),
            email: fetched.email,
            subscriptionId: sub.id,
            addressSource: 'shipping',
          };
        }
        // Fallback: use billing address if available
        if (fetched?.address) {
          billingFallbacks.push(fetched.email);
          return {
            id: fetched.id,
            name: fetched.name || '',
            address: normalizeStripeAddress(fetched.address),
            email: fetched.email,
            subscriptionId: sub.id,
            addressSource: 'billing', // @why: Mark as billing fallback
          };
        }
      } catch (err) {
        // @why: Log and skip if customer fetch fails
        console.warn(
          '[shipping-hub-metrics] Could not fetch customer',
          cust.id,
          err.message
        );
      }
      return null; // Skip if no address anywhere
    })
  );
  // @why: Log the number of addresses after fallback for debugging
  const filteredAddresses = addresses.filter(Boolean);
  console.log(
    '[shipping-hub-metrics] Subscriptions with address (after all fallbacks):',
    filteredAddresses.length
  );
  console.log(
    '[shipping-hub-metrics] Subscriptions using billing address as fallback:',
    billingFallbacks
  );

  // @why: Collect emails of subscriptions with no shipping address anywhere
  const missingAddresses = addresses
    .map((addr, idx) => {
      if (addr === null) {
        // The corresponding subscription
        const sub = subscriptions[idx];
        // Try to get email from expanded customer
        return sub.customer?.email || null;
      }
      return null;
    })
    .filter(Boolean);
  console.log(
    '[shipping-hub-metrics] Subscriptions missing shipping address:',
    missingAddresses
  );

  // --- 3. Group by "region" or country, pick representative destination
  const countryMap = {};
  const repDestMapping = { ...REGION_DEST_ADDRESSES };

  for (const addr of filteredAddresses) {
    let group = addr.address.country;
    // assign continent/region if in one of our lists
    for (const [region, codes] of Object.entries(REGION_COUNTRIES)) {
      if (codes.includes(group)) {
        group = region;
        break;
      }
    }
    if (!countryMap[group]) countryMap[group] = [];
    countryMap[group].push(addr);
    // set first-seen repAddr for any "other" single-country groups
    if (!repDestMapping[group]) repDestMapping[group] = addr.address;
  }

  // --- 4. For each group, fetch cheapest rates in parallel (with cache + skip rules)
  const countryRates = {};
  for (const [group, addrList] of Object.entries(countryMap)) {
    const dest = repDestMapping[group];
    countryRates[group] = {};

    // decide which hubs to query
    let hubsToQuery = [];
    // if this group is exactly one of the hub's own country, only query that hub
    const match = Object.entries(HUB_COUNTRY).find(
      ([, code]) => code === group
    );
    if (match) {
      hubsToQuery = [match[0]];
    } else {
      hubsToQuery = Object.keys(ORIGINS).filter(
        (hub) => !SKIP_HUB_REGION[hub]?.includes(group)
      );
    }

    // parallel fetch
    const responses = await Promise.all(
      hubsToQuery.map(async (hub) => {
        const rate = await getCheapestRateCached(hub, ORIGINS[hub], dest);
        return { hub, rate };
      })
    );

    // map into countryRates
    for (const { hub, rate } of responses) {
      countryRates[group][hub] = rate
        ? {
            courier: rate.courier_name,
            cost: rate.total_charge,
            service: rate.courier_service_name,
          }
        : null;
    }
  }

  // --- 5. Map back to each individual customer, pick their cheapest hub
  const results = filteredAddresses.map((addr) => {
    let group = addr.address.country;
    for (const [region, codes] of Object.entries(REGION_COUNTRIES)) {
      if (codes.includes(group)) {
        group = region;
        break;
      }
    }
    const rates = countryRates[group] || {};
    let cheapestHub = null;
    let cheapestCost = Infinity;
    for (const [hub, info] of Object.entries(rates)) {
      if (info && info.cost < cheapestCost) {
        cheapestCost = info.cost;
        cheapestHub = hub;
      }
    }
    return {
      ...addr,
      cheapest: rates,
      cheapestHub,
      cheapestCost: isFinite(cheapestCost) ? cheapestCost : null,
    };
  });

  // --- 6. Aggregate summary
  const summary = {
    total: results.length,
    byHub: {},
    totalCostByHub: {},
    addresses: results,
    missingAddresses, // @why: List of emails with no shipping or billing address
    billingFallbacks, // @why: List of emails using billing address as fallback
  };

  for (const hub of Object.keys(ORIGINS)) {
    summary.byHub[hub] = results.filter((r) => r.cheapestHub === hub).length;
    let total = 0;
    for (const [group, addrList] of Object.entries(countryMap)) {
      const cost = countryRates[group][hub]?.cost || 0;
      total += cost * addrList.length;
    }
    summary.totalCostByHub[hub] = total;
  }

  // --- 7. Respond
  res.status(200).json(summary);
}
