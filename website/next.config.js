const withPreact = require('next-plugin-preact');
// const withPrefresh = require('@prefresh/next');
const path = require('path');
require('dotenv').config();

module.exports = withPreact({
  env: {
    SANITY_PREVIEW_SECRET: process.env.SANITY_PREVIEW_SECRET,
    SANITY_PROJECT_ID: process.env.SANITY_PROJECT_ID,
    SANITY_API_TOKEN: process.env.SANITY_API_TOKEN,
    SANITY_API_TOKEN_WRITE: process.env.SANITY_API_TOKEN_WRITE,
    SNIPCART_SECRET_KEY: process.env.SNIPCART_SECRET_KEY,
    SNIPCART_API_KEY: process.env.SNIPCART_API_KEY,
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
    MAILCHIMP_LIST_ID: process.env.MAILCHIMP_LIST_ID,
    MAILCHIMP_API_KEY: process.env.MAILCHIMP_API_KEY,
    IRON_PASSWORD: process.env.IRON_PASSWORD,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    SITE_URL: process.env.SITE_URL,
    DOMAIN_TYPE: process.env.DOMAIN_TYPE,
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
});
