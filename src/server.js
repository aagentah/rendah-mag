/* @flow */

import path from 'path';
import morgan from 'morgan';
import express from 'express';
import compression from 'compression';
import helmet from 'helmet';
import hpp from 'hpp';
import favicon from 'serve-favicon';
import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import chalk from 'chalk';
import cors from 'cors';
import createHistory from 'history/createMemoryHistory';
import { frontloadServerRender } from 'react-frontload';

import configureStore from './redux/store';
import Html from './utils/Html';
import App from './containers/App';
import { port, host } from './config';
import handleFeeds from './handleFeeds';

const app = express();

// Using helmet to secure Express with various HTTP headers
app.use(helmet());
// Prevent HTTP parameter pollution.
app.use(hpp());
// Compress all requests
app.use(compression());
// begin CORS
app.use(cors());

// Use morgan for http request debug (only show error)
app.use(morgan('dev', { skip: (req, res) => res.statusCode < 400 }));
app.use(favicon(path.join(process.cwd(), './public/favicon.ico')));
app.use(express.static(path.join(process.cwd(), './public')));

// Run express as webpack dev server
if (__DEV__) {
  const webpack = require('webpack');
  const webpackConfig = require('../tools/webpack/config.babel');
  const compiler = webpack(webpackConfig);

  app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    hot: true,
    noInfo: true,
    stats: { colors: true },
    serverSideRender: true,
  }));

  app.use(require('webpack-hot-middleware')(compiler));
}

// handle site map and mailchimp feeds
handleFeeds(app);

// Register server-side rendering middleware
app.get('*', (req, res) => {
  if (__DEV__) webpackIsomorphicTools.refresh();

  const history = createHistory();
  const store = configureStore(history);
  const routerContext = {};

  const renderHtmlContent = () =>
    renderToString(
      <Provider store={store}>
        <StaticRouter location={req.url} context={routerContext} >
          <App noServerRender={__DISABLE_SSR__} />
        </StaticRouter>
      </Provider>,
    );

  const renderHtml = (htmlContent) => {
    const html = renderToStaticMarkup(
      <Html
        store={store}
        htmlContent={htmlContent}
        noServerRender={__DISABLE_SSR__}
      />,
    );

    return `<!doctype html>${html}`;
  };

  // Send response after all the action(s) are dispatched
  frontloadServerRender(renderHtmlContent)
    .then((htmlContent) => {
      // Check if the render result contains a redirect, if so we need to set
      // the specific status and redirect header and end the response
      if (routerContext.url) {
        res.status(301).setHeader('Location', routerContext.url);
        res.end();
        return;
      }

      // Checking is page is 404
      const status = routerContext.status === '404' ? 404 : 200;
      // Pass the route and initial state into html template
      res.status(status).send(renderHtml(htmlContent));
    })
    .catch((err) => {
      res.status(404).send('Not Found :(');
      console.error(`==> 😭  Rendering routes error: ${err}`);
    });
});


if (port) {
  app.listen(port, host, (err) => {
    const url = `http://${host}:${port}`;
    if (err) console.error(`==> 😭  OMG!!! ${err}`);
    console.info(chalk.green(`==> 🌎  Listening at ${url}`));

    // Open Chrome
    require('../tools/openBrowser')(url);
  });
} else {
  console.error(chalk.red('==> 😭  OMG!!! No PORT environment variable has been specified'));
}
