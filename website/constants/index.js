// Common
export const SITE_URL = 'https://danjonesmcr-next-boilerplate.herokuapp.com';

// Snipcart
export const IS_ECCOMERCE = true;

export const SNIPCART_SECRET_KEY =
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
    ? process.env.SNIPCART_DEV_SECRET_KEY
    : process.env.SNIPCART_PROD_SECRET_KEY;

export const SNIPCART_API_KEY =
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
    ? process.env.SNIPCART_DEV_API_KEY
    : process.env.SNIPCART_PROD_API_KEY;
