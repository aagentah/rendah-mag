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
import { StaticRouter, matchPath } from 'react-router-dom';
import { Provider } from 'react-redux';
import chalk from 'chalk';

import createHistory from 'history/createMemoryHistory';
import configureStore from './redux/store';
import Html from './utils/Html';
import App from './containers/App';
import routes from './routes';
import { port, host } from './config';

const app = express();

// Using helmet to secure Express with various HTTP headers
app.use(helmet());
// Prevent HTTP parameter pollution.
app.use(hpp());
// Compress all requests
app.use(compression());

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

//GET week
app.get('/api/week', (req, res) => {

    var articles = [];

    db.collection('articles')
        .find()
        .limit(2)
        .sort("date", -1)
        .toArray()
        .then(result => {
            articles = articles.concat(result);
        }).then(() => {
            // console.log(articles);
            res.send(articles);
        }).catch(e => {
            console.error(e);
        });

});

//GET articles
app.get('/api/articles', (req, res) => {

    var articles = [];

    db.collection('articles')
        .find()
        .limit(12)
        .sort("date", -1)
        .toArray()
        .then(result => {
            articles = articles.concat(result);
        }).then(() => {
            // console.log(articles);
            res.send(articles);
        }).catch(e => {
            console.error(e);
        });

});

//GET authorArticles
app.get('/api/authorArticles', (req, res) => {

    var articles = [];

    var ObjectId = require('mongodb').ObjectID;
    var author = {};
    var param = req.query.authorQuery;
    param = param.replace(/-/g, ' ');

    db.collection('articles')
        // .find()
        .find({"author" : {$regex : ".*" + param + ".*"}})
        .limit(12)
        .sort("date", -1)
        .toArray()
        .then(result => {
            articles = articles.concat(result);
        }).then(() => {
            // console.log(articles);
            res.send(articles);
        }).catch(e => {
            console.error(e);
        });

});

//GET extra
app.get('/api/extra', (req, res) => {

    var articles = [];

    db.collection('articles')
        .aggregate([{ $sample: { size: 4 } }])
        .toArray()
        .then(result => {
            articles = articles.concat(result);
        }).then(() => {
            // console.log(articles);
            res.send(articles);
        }).catch(e => {
            console.error(e);
        });

});

//GET authors
app.get('/api/authors', (req, res) => {

    var authors = [];

    db.collection('authors')
        .find()
        .limit(24)
        .toArray()
        .then(result => {
            // console.log(result);
            authors = authors.concat(result);
        }).then(() => {
            res.send(authors);
        }).catch(e => {
            console.error(e);
        });

});

//GET search
app.get('/api/search', (req, res) => {

    var articles = [];

    db.collection('articles')
        .find({$or:[
                {title: {$regex : ".*" + req.query.searchQuery + ".*", '$options' : 'i'}},
                {description: {$regex : ".*" + req.query.searchQuery + ".*", '$options' : 'i'}},
                {author: {$regex : ".*" + req.query.searchQuery + ".*", '$options' : 'i'}},
                {keywords: {$regex : ".*" + req.query.searchQuery + ".*", '$options' : 'i'}}
              ]})
        .limit(24)
        .sort("date", -1)
        .toArray()
        .then(result => {
            articles = articles.concat(result);
        }).then(() => {
            // console.log(articles);
            res.send(articles);
        }).catch(e => {
            console.error(e);
        });

});

//GET category
app.get('/api/category', (req, res) => {

    var articles = [];

    db.collection('articles')
        .find({$or:[
                {category: {$regex : ".*" + req.query.categoryQuery + ".*"}}
              ]})
        .limit(12)
        .sort("date", -1)
        .toArray()
        .then(result => {
            articles = articles.concat(result);
        }).then(() => {
            // console.log(articles);
            res.send(articles);
        }).catch(e => {
            console.error(e);
        });

});

//GET article
app.get('/api/article', (req, res) => {

    var ObjectId = require('mongodb').ObjectID;
    var article = {};
    var param = req.query.title;
    param = param.replace(/-/g, ' ');

    db.collection('articles')
        .findOne({"title": param})
        .then(result => {
            article = result;
        }).then(() => {
            res.send(article);
        }).catch(e => {
            console.error(e);
        });

});

//GET author
app.get('/api/author', (req, res) => {

    var ObjectId = require('mongodb').ObjectID;
    var article = {};
    var param = req.query.title;
    param = param.replace(/-/g, ' ');

    db.collection('authors')
        .findOne({"name": param})
        .then(result => {
            article = result;
        }).then(() => {
            res.send(article);
        }).catch(e => {
            console.error(e);
        });

});

// Register server-side rendering middleware
app.get('*', (req, res) => {
  if (__DEV__) webpackIsomorphicTools.refresh();

  const history = createHistory();
  const store = configureStore(history);
  const renderHtml = (store, htmlContent) => { // eslint-disable-line no-shadow
    const html = renderToStaticMarkup(<Html store={store} htmlContent={htmlContent} />);

    return `<!doctype html>${html}`;
  };

  // If __DISABLE_SSR__ = true, disable server side rendering
  if (__DISABLE_SSR__) {
    res.send(renderHtml(store));
    return;
  }

  // Load data on server-side
  const loadBranchData = () => {
    const promises = [];

    routes.some((route) => {
      const match = matchPath(req.path, route);

      // $FlowFixMe: the params of pre-load actions are dynamic
      if (match && route.loadData) promises.push(route.loadData(store.dispatch, match.params));

      return match;
    });

    return Promise.all(promises);
  };

  // Send response after all the action(s) are dispathed
  loadBranchData()
    .then(() => {
      // Setup React-Router server-side rendering
      const routerContext = {};
      const htmlContent = renderToString(
        <Provider store={store}>
          <StaticRouter location={req.url} context={routerContext}>
            <App />
          </StaticRouter>
        </Provider>,
      );

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
      res.status(status).send(renderHtml(store, htmlContent));
    })
    .catch((err) => {
      res.status(404).send('Not Found :(');

      console.error(`==> 😭  Rendering routes error: ${err}`);
    });
});

// connect to mongo db
var db
const MongoClient = require('mongodb').MongoClient
MongoClient.connect('mongodb://dannyjones360:test@ds123930.mlab.com:23930/halftimefront', (err, database) => {
    if (err) return console.log(err);
    db = database
    console.log('db connected');
})

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
