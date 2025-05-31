/**
 * Regional pricing utility functions
 * Centralizes country-to-region mapping and pricing logic
 */

// Country to shipping zone mapping
export const COUNTRY_TO_REGION = {
  // UK
  GB: 'UK',

  // USA
  US: 'US',

  // Canada
  CA: 'CANADA',

  // Australia
  AU: 'AUSTRALIA',

  // China
  CN: 'CHINA',

  // Europe - EU Member States (27 countries)
  AT: 'EUROPE', // Austria
  BE: 'EUROPE', // Belgium
  BG: 'EUROPE', // Bulgaria
  HR: 'EUROPE', // Croatia
  CY: 'EUROPE', // Cyprus
  CZ: 'EUROPE', // Czech Republic (Czechia)
  DK: 'EUROPE', // Denmark
  EE: 'EUROPE', // Estonia
  FI: 'EUROPE', // Finland
  FR: 'EUROPE', // France
  DE: 'EUROPE', // Germany
  GR: 'EUROPE', // Greece
  HU: 'EUROPE', // Hungary
  IE: 'EUROPE', // Ireland
  IT: 'EUROPE', // Italy
  LV: 'EUROPE', // Latvia
  LT: 'EUROPE', // Lithuania
  LU: 'EUROPE', // Luxembourg
  MT: 'EUROPE', // Malta
  NL: 'EUROPE', // Netherlands
  PL: 'EUROPE', // Poland
  PT: 'EUROPE', // Portugal
  RO: 'EUROPE', // Romania
  SI: 'EUROPE', // Slovenia
  SK: 'EUROPE', // Slovakia
  ES: 'EUROPE', // Spain
  SE: 'EUROPE', // Sweden

  // Europe - EFTA Countries (4 countries)
  IS: 'EUROPE', // Iceland
  LI: 'EUROPE', // Liechtenstein
  NO: 'EUROPE', // Norway
  CH: 'EUROPE', // Switzerland

  // Europe - EU Candidate Countries (9 countries)
  AL: 'EUROPE', // Albania
  BA: 'EUROPE', // Bosnia and Herzegovina
  GE: 'EUROPE', // Georgia
  MD: 'EUROPE', // Moldova
  ME: 'EUROPE', // Montenegro
  MK: 'EUROPE', // North Macedonia
  RS: 'EUROPE', // Serbia
  TR: 'EUROPE', // Turkey (Türkiye)
  UA: 'EUROPE', // Ukraine

  // Europe - Other European Countries (7 countries)
  AD: 'EUROPE', // Andorra
  BY: 'EUROPE', // Belarus
  MC: 'EUROPE', // Monaco
  RU: 'EUROPE', // Russian Federation
  SM: 'EUROPE', // San Marino
  VA: 'EUROPE', // Vatican City (Holy See)
  XK: 'EUROPE', // Kosovo (potential candidate)
};

/**
 * Get regional pricing configuration based on customer country
 * @param {Object} regionalPricing - Regional pricing object from CMS
 * @param {string} customerCountry - Customer country code
 * @returns {Object} Regional pricing configuration with price, currency, and region
 */
export function getRegionalPricing(regionalPricing, customerCountry) {
  if (!regionalPricing || !customerCountry) {
    return {
      price: regionalPricing?.globalPrice || 0,
      currency: 'GBP',
      region: 'Global',
    };
  }

  const region = COUNTRY_TO_REGION[customerCountry];

  switch (region) {
    case 'UK':
      return {
        price: regionalPricing.ukPrice,
        currency: 'GBP',
        region: 'UK',
      };
    case 'US':
      return {
        price: regionalPricing.usPrice,
        currency: 'USD',
        region: 'US',
      };
    case 'CANADA':
      return {
        price: regionalPricing.canadaPrice,
        currency: 'CAD',
        region: 'Canada',
      };
    case 'AUSTRALIA':
      return {
        price: regionalPricing.australiaPrice,
        currency: 'AUD',
        region: 'Australia',
      };
    case 'CHINA':
      return {
        price: regionalPricing.chinaPrice,
        currency: 'CNY',
        region: 'China',
      };
    case 'EUROPE':
      return {
        price: regionalPricing.europePrice,
        currency: 'EUR',
        region: 'Europe',
      };
    default:
      return {
        price: regionalPricing.globalPrice,
        currency: 'GBP',
        region: 'Global',
      };
  }
}

/**
 * Get display region name for customer
 * @param {string} customerCountry - Customer country code
 * @returns {string} Display-friendly region name
 */
export function getDisplayRegion(customerCountry) {
  if (!customerCountry) return 'Global';

  const region = COUNTRY_TO_REGION[customerCountry];

  switch (region) {
    case 'UK':
      return 'UK';
    case 'US':
      return 'US';
    case 'CANADA':
      return 'Canada';
    case 'AUSTRALIA':
      return 'Australia';
    case 'CHINA':
      return 'China';
    case 'EUROPE':
      return 'Europe';
    default:
      return 'Global';
  }
}

/**
 * Get regional shipping configuration based on customer country
 * @param {Object} regionalShipping - Regional shipping object from CMS
 * @param {string} customerCountry - Customer country code
 * @returns {Array} Stripe shipping options for the region
 */
export function getRegionalShipping(regionalShipping, customerCountry) {
  if (!regionalShipping) {
    throw new Error('Product missing regional shipping configuration');
  }

  const region = COUNTRY_TO_REGION[customerCountry];

  const createShippingOption = (config, displayName, currency) => ({
    shipping_rate_data: {
      type: 'fixed_amount',
      fixed_amount: {
        amount: Math.round(config.price * 100), // Convert to smallest currency unit
        currency: currency.toLowerCase(), // Use hardcoded currency by region
      },
      display_name: displayName,
    },
  });

  switch (region) {
    case 'UK':
      return [
        createShippingOption(regionalShipping.ukShipping, 'UK Shipping', 'GBP'),
      ];
    case 'US':
      return [
        createShippingOption(
          regionalShipping.usShipping,
          'USA Shipping',
          'USD'
        ),
      ];
    case 'CANADA':
      return [
        createShippingOption(
          regionalShipping.canadaShipping,
          'Canada Shipping',
          'CAD'
        ),
      ];
    case 'AUSTRALIA':
      return [
        createShippingOption(
          regionalShipping.australiaShipping,
          'Australia Shipping',
          'AUD'
        ),
      ];
    case 'CHINA':
      return [
        createShippingOption(
          regionalShipping.chinaShipping,
          'China Shipping',
          'CNY'
        ),
      ];
    case 'EUROPE':
      return [
        createShippingOption(
          regionalShipping.europeShipping,
          'Europe Shipping',
          'EUR'
        ),
      ];
    default:
      // Global shipping option
      return [
        createShippingOption(
          { price: regionalShipping.globalShipping.price },
          'Global Shipping',
          'GBP'
        ),
      ];
  }
}
