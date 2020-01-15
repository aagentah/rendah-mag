/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import { Heading, Copy } from 'rendah-pattern-library';

import SubscribeBanner from '../../../../components/SubscribeBanner';
import LatestArticles from '../../../../containers/Fragments/Blog/LatestArticles';
import CategoryGrid from '../../../../components/CategoryGrid';

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
    const img =
      'http://res.cloudinary.com/dzz8ji5lj/image/upload/v1544352629/brand/meta-subscribe.jpg';

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

        <div className="container-medium  mla  mra  pt4  mv3">
          <div className="flex  pb2  ph3">
            <Heading
              /* Options */
              htmlEntity={'h1'}
              text={title}
              color={'black'}
              size={'x-large'}
              truncate={null}
              reveal
            />
          </div>
          <div className="flex  pb2  ph3">
            <Copy
              /* Options */
              text={desc}
              color={'black'}
              size={'medium'}
              truncate={null}
            />
          </div>
        </div>

        <div className="container-medium  mla  mra  pt2  pt0-md  pb4">
          <div className="flex  flex-wrap  ph3">
            <div className="mw7  relative">
              <SubscribeBanner />
            </div>
          </div>
        </div>

        <div className="container-medium  center  pv2">
          <div className="flex  flex-wrap">
            <LatestArticles range={[1, 4]} type="grid" padding="pb4" />
          </div>
        </div>

        <CategoryGrid padding="" />
      </main>
    );
  }
}

export default Subscribe;
