/* @flow */
/* eslint-disable import/no-named-as-default, , jsx-a11y/label-has-for */

import React from 'react';
import type { Element } from 'react';
import { Route, Switch } from 'react-router-dom';
import _ from 'lodash';
import Helmet from 'react-helmet';
import { Frontload } from 'react-frontload';

import config from '../../config';
import routes from '../../routes';
import '../../theme/main.scss';

import Header from './Header';
import Footer from './Footer';

type PassedProps = {
  noServerRender: boolean
}

const App = (props: PassedProps): Element<'div'> => {
  // Use it when sub routes are added to any route it'll work
  const routeWithSubRoutes = (route): Element<typeof Route> => (
    <Route
      key={_.uniqueId()}
      exact={route.exact || false}
      path={route.path}
      render={componentProps => (
        // Pass the sub-routes down to keep nesting
        <route.component {...componentProps} routes={route.routes || null} />
      )}
    />
  );

  return (
    <Frontload noServerRender={props.noServerRender} >
      <React.Fragment>
        <Helmet {...config.app} />
        <div className="App">
          <Header />
          <Switch>{routes.map(route => routeWithSubRoutes(route))}</Switch>
          <Footer />
        </div>
      </React.Fragment>
    </Frontload>
  );
};

export default App;
