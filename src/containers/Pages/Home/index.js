/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import MessengerCustomerChat from 'react-messenger-customer-chat';

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
    const title = 'Home';
    const desc = 'Beats, Halftime & Future Bass Magazine focused on the latest news & releases.';
    const canonical = 'https://www.rendahmag.com/';

    return (
      <main className="page-fade-in">
        <Helmet title="Home" />
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={desc} />
          <link rel="canonical" href={canonical} />
        </Helmet>
        <h1 className="dn">Home</h1>
        <WeekArticles padding="pt4  pb2" />
        <LatestArticles limit={16} type="grid" padding="pb4" />
        <CategoryGrid padding="" />
        <div className="dn  db-lg">
          <MessengerCustomerChat
            pageId="302421033575970"
            appId="154881868603516"
            loggedInGreeting="Welcome to Rendah."
            loggedOutGreeting="Welcome to Rendah."
            themeColor="#737373"
          />
        </div>
      </main>
    );
  }
}

export default Home;
