/* @flow */

import { routerMiddleware } from 'connected-react-router';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';
import chalk from 'chalk';

import type { Store } from '../types';
import createRootReducer from './reducers';

export default (history: Object, initialState: Object = {}): Store => {
  const isServer = typeof window === 'undefined';

  const middlewares = [
    routerMiddleware(history),
    thunk.withExtraArgument(axios),
  ];

  const composeEnhancers =
  // @ts-ignore
  (__DEV__ && !isServer && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

  const enhancers = composeEnhancers(
    applyMiddleware(...middlewares),
    // Add other enhancers here
  );

  const store = createStore(
    createRootReducer(history),
    initialState || {},
    enhancers,
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      try {
        const nextReducer = require('./reducers').default;

        store.replaceReducer(nextReducer);
      } catch (error) {
        console.error(chalk.red(`==> 😭  Reducer hot reloading error ${error}`));
      }
    });
  }

  return store;
};
