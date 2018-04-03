/* @flow */
/* eslint-disable import/no-named-as-default, , jsx-a11y/label-has-for */

import React from 'react';
import type { Element } from 'react';
import { Route, Switch } from 'react-router-dom';
import Helmet from 'react-helmet';
import _ from 'lodash';

import config from '../../config';
import routes from '../../routes';
import '../../theme/main.scss';

import Header from './Header';
import Footer from './Footer';


const App = (): Element<'div'> => {
  // Use it when sub routes are added to any route it'll work
  const routeWithSubRoutes = (route): Element<typeof Route> => (
    <Route
      key={_.uniqueId()}
      exact={route.exact || false}
      path={route.path}
      render={props => (
        // Pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes || null} />
      )}
    />
  );

  return (
    <div>
      <Helmet {...config.app} />
      <div className="App">
        <Header />
        <Switch>{routes.map(route => routeWithSubRoutes(route))}</Switch>
        <Footer />
      </div>
    </div>
  );
};

export default App;
