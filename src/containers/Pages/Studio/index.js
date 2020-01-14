/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';

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
    const desc = 'Beats, Halftime & Future Bass Magazine focused on the latest news & releases.';
    const canonical = 'https://www.rendahmag.com/';

    return (
      <main className="page-fade-in">
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={desc} />
          <link rel="canonical" href={canonical} />
        </Helmet>

        <h1 className="dn">Studio</h1>


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
