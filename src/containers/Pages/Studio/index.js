/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import { Heading, Copy } from 'rendah-pattern-library';

import LatestArticles from '../../../containers/Fragments/Studio/LatestArticles';

export class Studio extends PureComponent {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  componentDidUpdate() {
    window.scrollTo(0, 0);
  }

  render() {
    const title = 'Studio';
    const description = 'Beats, Halftime & Future Bass Magazine focused on the latest news & releases.';
    const canonical = 'https://www.rendahmag.com/studio';

    return (
      <main className="page-fade-in">
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <link rel="canonical" href={canonical} />
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
              text={description}
              color={'black'}
              size={'medium'}
              truncate={1}
            />
          </div>
        </div>

        <div className="container-medium  center  pv2">
          <div className="flex  flex-wrap">
            <LatestArticles range={[1, 16]} type="grid" padding="ph3  pb2" />
          </div>
        </div>
      </main>
    );
  }
}

export default Studio;
