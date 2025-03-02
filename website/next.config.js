const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const path = require('path');
require('dotenv').config();

module.exports = withBundleAnalyzer({
  env: {
    SANITY_PREVIEW_SECRET: process.env.SANITY_PREVIEW_SECRET,
    SANITY_PROJECT_ID: process.env.SANITY_PROJECT_ID,
    SANITY_API_TOKEN: process.env.SANITY_API_TOKEN,
    SANITY_API_TOKEN_WRITE: process.env.SANITY_API_TOKEN_WRITE,
    SEND_IN_BLUE_API_KEY: process.env.SEND_IN_BLUE_API_KEY,
    MAILCHIMP_LIST_ID: process.env.MAILCHIMP_LIST_ID,
    MAILCHIMP_API_KEY: process.env.MAILCHIMP_API_KEY,
    IRON_PASSWORD: process.env.IRON_PASSWORD,
    SITE_URL: process.env.SITE_URL,
    ENV_TYPE: process.env.ENV_TYPE,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_SIGNING_SECRET: process.env.STRIPE_SIGNING_SECRET,
    PAYPAL_SECRET: process.env.PAYPAL_SECRET,
    DISCORD_WEBHOOK: process.env.DISCORD_WEBHOOK,
    DISCORD_BOT_KEY: process.env.DISCORD_BOT_KEY,
  },
  images: {
    domains: ['cdn.sanity.io', 'res.cloudinary.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/q8z2vf2k/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/dzz8ji5lj/image/**',
      },
    ],
  },
  webpack(config, { dev, isServer }) {
    // Set up alias for your project root directory
    config.resolve.alias['~'] = path.resolve(__dirname);
    // Ensure no alias remaps for react or react-dom are set here
    return config;
  },
});
