/* eslint-disable react/sort-comp */
/* eslint-disable import/no-named-as-default */


import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';

import WeekArticles from '../../../containers/Fragments/WeekArticles';
import LatestArticles from '../../../containers/Fragments/LatestArticles';
import CategoryGrid from '../../../components/CategoryGrid';
import SearchInput from '../../../components/SearchInput';
import SubscribeBanner from '../../../components/SubscribeBanner';

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
        <WeekArticles />
        <p className="pt3  t6  fw6  black  tac  title-font">Subscribe to Rendah</p>
        <div className="pt1  pb4"><SubscribeBanner /></div>
        <LatestArticles />
        <p className="pt4  t6  fw6  black  tac  title-font">Search the site for more</p>
        <div className="pt1  pb4"><SearchInput textAlign="tac" /></div>
        <CategoryGrid />
      </main>
    );
  }
}

export default Home;
