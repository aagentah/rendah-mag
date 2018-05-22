/* eslint-disable react/sort-comp */
/* eslint-disable import/no-named-as-default */


import React, { PureComponent } from 'react';
import WeekArticles from '../../../containers/Fragments/WeekArticles';
import LatestArticles from '../../../containers/Fragments/LatestArticles';
import SearchInput from '../../../components/SearchInput';
import SubscribeBanner from '../../../components/SubscribeBanner';
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
        <Helmet>
          <meta name="description" content="Nested component" />
        </Helmet>
        <h1 className="dn">Home</h1>
        <WeekArticles />
        <p className="pt3  t6  fw6  black  tac  title-font">Subscribe to Rendah</p>
        <div className="pt1  pb2"><SubscribeBanner /></div>
        <LatestArticles />
        <p className="pt4  t6  fw6  black  tac  title-font">Search the site for more</p>
        <div className="pt1  pb2"><SearchInput textAlign="tac" /></div>
        <CategoryGrid />
      </main>
    );
  }
}

export default Home;
