/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';

import Hero from '../../../components/Hero';
import StoreList from '../../../components/StoreList';

export class Store extends PureComponent {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  componentDidUpdate() {
    window.scrollTo(0, 0);
  }

  render() {
    const title = 'Store';

    return (
      <main className="page-fade-in">
        <Helmet title={title} />
        <Hero type="h1" title={title} styles="t-title  ttu  f3  bold  dark-grey" padding="pb4" />
        <StoreList />
      </main>
    );
  }
}

export default Store;
