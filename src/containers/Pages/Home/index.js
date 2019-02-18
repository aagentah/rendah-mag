/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';

import FeaturedArticles from '../../../containers/Fragments/FeaturedArticles';
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
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={desc} />
          <link rel="canonical" href={canonical} />
        </Helmet>

        <h1 className="dn">Home</h1>
        <FeaturedArticles padding="pt0  pt4-md  pb4" />

        <div className="container-medium  center  pt3  pb4">
          <div className="col-24  tac">
            <Link
              className="btn  btn--primary  ba  bw1  bc-black  black  white-hover  bg-white  bg-black-hover  center  dib"
              title="Subscribe"
              to="/subscribe"
            >
              Subscribe to our Newsletter
            </Link>
          </div>
        </div>

        <LatestArticles range={[1, 24]} type="grid" padding="pt2  pb4" />
        <CategoryGrid padding="" />
      </main>
    );
  }
}

export default Home;
