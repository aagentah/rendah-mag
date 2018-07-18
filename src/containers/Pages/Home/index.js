/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';

import WeekArticles from '../../../containers/Fragments/WeekArticles';
import LatestArticles from '../../../containers/Fragments/LatestArticles';
import SearchInput from '../../../components/SearchInput';
import SubscribeBanner from '../../../components/SubscribeBanner';
import UpdatesBanner from '../../../components/UpdatesBanner';
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
        <div className="pt4  mt2  pb3  over-hidden"><SubscribeBanner /></div>
        <WeekArticles />
        <UpdatesBanner />
        <LatestArticles />
        <div className="pt4  pb3"><SearchInput textAlign="tac" /></div>
        <CategoryGrid />
      </main>
    );
  }
}

export default Home;
