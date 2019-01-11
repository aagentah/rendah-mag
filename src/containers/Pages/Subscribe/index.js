/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';

import Hero from '../../../components/Hero';
import SubscribeBanner from '../../../components/SubscribeBanner';
import LatestArticles from '../../../containers/Fragments/LatestArticles';
import CategoryGrid from '../../../components/CategoryGrid';

export class Subscribe extends PureComponent {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  componentDidUpdate() {
    window.scrollTo(0, 0);
  }

  render() {
    const title = 'Subscribe';
    const desc = 'The latest news & releases, straight to your inbox.';
    const canonical = 'https://www.rendahmag.com/subscribe';
    const img = 'http://res.cloudinary.com/dzz8ji5lj/image/upload/v1544352629/brand/meta-subscribe.jpg';

    return (
      <main className="page-fade-in">
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={desc} />
          <link rel="canonical" href={canonical} />

          <meta name="twitter:title" content={title} />
          <meta name="twitter:description" content={desc} />
          <meta name="twitter:image" content={img} />

          <meta property="og:title" content={title} />
          <meta property="og:url" content={canonical} />
          <meta property="og:image" content={img} />
        </Helmet>

        <Hero type="h1" title={title} styles="t-title  ttu  f3  bold  dark-grey" padding="pb4" />

        <div className="container-medium  center  pt4  pb4">
          <div className="flex  flex-wrap">
            <div className="col-24">
              <p className="t-body  dark-grey  f6  tac  mw6  db  center  pb2">{desc}</p>
            </div>
          </div>

          <div className="center  w-100  mw6  ph2  ph5-sm  pv3">
            <SubscribeBanner />
          </div>
        </div>

        <LatestArticles range={[1, 4]} type="grid" padding="pb4" />
        <CategoryGrid padding="" />
      </main>
    );
  }
}

export default Subscribe;
