// Common
export const SITE_URL =
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://www.rendahmag.com';

// Snipcart
export const IS_ECCOMERCE = true;

// >>> Revert to this when goes live

// export const SNIPCART_SECRET_KEY =
//   !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
//     ? process.env.SNIPCART_DEV_SECRET_KEY
//     : process.env.SNIPCART_PROD_SECRET_KEY;

export const SNIPCART_SECRET_KEY = process.env.SNIPCART_DEV_SECRET_KEY;

// >>> Revert to this when goes live

// export const SNIPCART_API_KEY =
//   !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
//     ? process.env.SNIPCART_DEV_API_KEY
//     : process.env.SNIPCART_PROD_API_KEY;

export const SNIPCART_API_KEY = process.env.SNIPCART_DEV_API_KEY;
