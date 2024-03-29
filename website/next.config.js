const withPreact = require('next-plugin-preact');
// const withPrefresh = require('@prefresh/next');
const path = require('path');
require('dotenv').config();

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer(
  withPreact({
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
      // // Move Preact into the framework chunk instead of duplicating in routes:
      // const splitChunks = config.optimization && config.optimization.splitChunks;
      // if (splitChunks) {
      //   const { cacheGroups } = splitChunks;
      //   const test = /[\\/]node_modules[\\/](preact|preact-render-to-string|preact-context-provider)[\\/]/;
      //   if (cacheGroups.framework) {
      //     cacheGroups.preact = Object.assign({}, cacheGroups.framework, { test });
      //     // if you want to merge the 2 small commons+framework chunks:
      //     // cacheGroups.commons.name = 'framework';
      //   }
      // }
      //
      // if (isServer) {
      //   // mark `preact` stuffs as external for server bundle to prevent duplicate copies of preact
      //   config.externals.push(
      //     /^(preact|preact-render-to-string|preact-context-provider)([\\/]|$)/
      //   );
      // }
      //
      // // Install webpack aliases:
      // const aliases = config.resolve.alias || (config.resolve.alias = {});
      // aliases.react = aliases['react-dom'] = 'preact/compat';
      //
      // // Automatically inject Preact DevTools:
      // if (dev && !isServer) {
      //   const { entry } = config;
      //   config.entry = () =>
      //     entry().then((entries) => {
      //       entries['main.js'] = ['preact/debug'].concat(
      //         entries['main.js'] || []
      //       );
      //       return entries;
      //     });
      // }

      config.resolve.alias['~'] = path.resolve(__dirname);

      return config;
    },
  })
);
