/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';

import WeekArticles from '../../../containers/Fragments/WeekArticles';
import LatestArticles from '../../../containers/Fragments/LatestArticles';
import CategoryGrid from '../../../components/CategoryGrid';

export class Home extends PureComponent {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  componentDidUpdate() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <main className="page-fade-in">
        <Helmet title="Home" />
        <h1 className="dn">Home</h1>
        <WeekArticles padding="pt4  pb2" />
        <LatestArticles limit={16} type="grid" padding="pb4" />
        <CategoryGrid padding="" />
      </main>
    );
  }
}

export default Home;
