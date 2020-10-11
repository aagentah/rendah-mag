const path = require('path');
require('dotenv').config();

module.exports = {
  webpack: (config) => {
    const configClone = config;
    configClone.resolve.alias['~'] = path.resolve(__dirname);
    return configClone;
  },
  env: {
    SANITY_PREVIEW_SECRET: process.env.SANITY_PREVIEW_SECRET,
    SANITY_PROJECT_ID: process.env.SANITY_PROJECT_ID,
    SANITY_API_TOKEN: process.env.SANITY_API_TOKEN,
    SANITY_API_TOKEN_WRITE: process.env.SANITY_API_TOKEN_WRITE,
    SNIPCART_PROD_SECRET_KEY: process.env.SNIPCART_PROD_SECRET_KEY,
    SNIPCART_PROD_API_KEY: process.env.SNIPCART_PROD_API_KEY,
    SNIPCART_DEV_SECRET_KEY: process.env.SNIPCART_DEV_SECRET_KEY,
    SNIPCART_DEV_API_KEY: process.env.SNIPCART_DEV_API_KEY,
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
    MAILCHIMP_LIST_ID: process.env.MAILCHIMP_LIST_ID,
    MAILCHIMP_API_KEY: process.env.MAILCHIMP_API_KEY,
    IRON_PASSWORD: process.env.IRON_PASSWORD,
    SITE_URL: proccess.env.SITE_URL,
    DOMAIN_TYPE: proccess.env.DOMAIN_TYPE,
  },
};
