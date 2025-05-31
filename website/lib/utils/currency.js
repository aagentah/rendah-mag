/**
 * Currency utility functions for multi-currency support
 * Centralizes currency symbol mapping and formatting
 */

/**
 * Get currency symbol based on currency code
 * @param {string} currency - Currency code (USD, EUR, GBP, CAD, AUD, CNY)
 * @returns {string} Currency symbol
 */
export function getCurrencySymbol(currency) {
  const symbols = {
    GBP: '£',
    USD: '$',
    EUR: '€',
    CAD: 'C$',
    AUD: 'A$',
    CNY: '¥',
  };

  return symbols[currency] || currency;
}

/**
 * Format price with currency symbol
 * @param {number} price - Price amount
 * @param {string} currency - Currency code
 * @returns {string} Formatted price string
 */
export function formatPrice(price, currency = 'GBP') {
  const symbol = getCurrencySymbol(currency);
  return `${symbol}${price.toFixed(2)}`;
}

/**
 * Get currency code based on country
 * @param {string} customerCountry - Country code
 * @returns {string} Currency code
 */
export function getCurrencyByCountry(customerCountry) {
  if (!customerCountry) return 'GBP';

  if (customerCountry === 'GB') return 'GBP';
  if (customerCountry === 'US') return 'USD';
  if (customerCountry === 'CA') return 'CAD';
  if (customerCountry === 'AU') return 'AUD';
  if (customerCountry === 'CN') return 'CNY';

  // Europe countries use EUR - comprehensive list including all EU, EFTA, candidates, and other European countries
  const europeCountries = [
    // EU Member States (27 countries)
    'AT', // Austria
    'BE', // Belgium
    'BG', // Bulgaria
    'HR', // Croatia
    'CY', // Cyprus
    'CZ', // Czech Republic (Czechia)
    'DK', // Denmark
    'EE', // Estonia
    'FI', // Finland
    'FR', // France
    'DE', // Germany
    'GR', // Greece
    'HU', // Hungary
    'IE', // Ireland
    'IT', // Italy
    'LV', // Latvia
    'LT', // Lithuania
    'LU', // Luxembourg
    'MT', // Malta
    'NL', // Netherlands
    'PL', // Poland
    'PT', // Portugal
    'RO', // Romania
    'SI', // Slovenia
    'SK', // Slovakia
    'ES', // Spain
    'SE', // Sweden

    // EFTA Countries (4 countries)
    'IS', // Iceland
    'LI', // Liechtenstein
    'NO', // Norway
    'CH', // Switzerland

    // EU Candidate Countries (9 countries)
    'AL', // Albania
    'BA', // Bosnia and Herzegovina
    'GE', // Georgia
    'MD', // Moldova
    'ME', // Montenegro
    'MK', // North Macedonia
    'RS', // Serbia
    'TR', // Turkey (Türkiye)
    'UA', // Ukraine

    // Other European Countries (7 countries)
    'AD', // Andorra
    'BY', // Belarus
    'MC', // Monaco
    'RU', // Russian Federation
    'SM', // San Marino
    'VA', // Vatican City (Holy See)
    'XK', // Kosovo (potential candidate)
  ];

  if (europeCountries.includes(customerCountry)) return 'EUR';

  // Default to GBP for global
  return 'GBP';
}
