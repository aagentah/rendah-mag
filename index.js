/* @flow */

// Use babel-register to precompile ES6 syntax
require('babel-core/register');

const WebpackIsomorphicTools = require('webpack-isomorphic-tools');

// Setup global variables for server
global.__CLIENT__ = false;
global.__SERVER__ = true;
global.__DISABLE_SSR__ = false; // Disable server side render here
global.__DEV__ = process.env.NODE_ENV !== 'production';

global.toTitleCase = (str) => {
  str = str.replace(/-/g, ' ');
  return str.replace(
        /\w\S*/g,
        function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}

global.toUrlCase = (str) => {
  return str.replace(/\s+/g, '-').toLowerCase();
}

// This should be the same with webpack context
const dirRoot = require('path').join(process.cwd());

// Settings of webpack-isomorphic-tools
global.webpackIsomorphicTools =
  new WebpackIsomorphicTools(require('./tools/webpack/WIT.config')).server(dirRoot, () => require('./src/server'));
