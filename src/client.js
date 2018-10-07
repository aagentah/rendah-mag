/* @flow */

import React from 'react';
// $FlowFixMe: it's not an error
import { hydrate, unmountComponentAtNode } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter } from 'react-router-redux';
import RedBox from 'redbox-react';
import { Route } from 'react-router-dom';
import { Frontload } from 'react-frontload';
import App from './containers/App';

import configureStore from './redux/store';
import withTracker from './withTracker';

// Get initial state from server-side rendering
const initialState = window.__INITIAL_STATE__;
const history = createHistory();
const store = configureStore(history, initialState);
const mountNode = document.getElementById('react-view');
const noServerRender = window.__noServerRender__;

if (process.env.NODE_ENV !== 'production') {
  console.log(`[react-frontload] server rendering configured ${noServerRender ? 'off' : 'on'}`);
}

const renderApp = () =>
  hydrate(
    <AppContainer errorReporter={({ error }) => <RedBox error={error} />}>
      <Provider store={store}>
        <Frontload noServerRender={window.__noServerRender__}>
          <ConnectedRouter onUpdate={() => window.scrollTo(0, 0)} history={history}>
            <Route
              component={withTracker(() => <App noServerRender={noServerRender} />)}
            />
          </ConnectedRouter>
        </Frontload>
      </Provider>
    </AppContainer>,
    mountNode,
  );

// Enable hot reload by react-hot-loader
if (module.hot) {
  const reRenderApp = () => {
    try {
      renderApp();
    } catch (error) {
      hydrate(<RedBox error={error} />, mountNode);
    }
  };

  module.hot.accept('./containers/App', () => {
    setImmediate(() => {
      // Preventing the hot reloading error from react-router
      unmountComponentAtNode(mountNode);
      reRenderApp();
    });
  });
}

renderApp();
