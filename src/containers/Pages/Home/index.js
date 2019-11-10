/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import { Button } from 'rendah-pattern-library';

import LatestArticles from '../../../containers/Fragments/Blog/LatestArticles';
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

    const subscribeWithLinkProps = {
      type: 'internal',
      url: '/subscribe',
      target: '_top',
      routerLink: Link,
    };

    return (
      <main className="page-fade-in">
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={desc} />
          <link rel="canonical" href={canonical} />
        </Helmet>

        <h1 className="dn">Home</h1>

        <div className="container-medium  center  mt2  pt4  pb4">
          <div className="col-24  tac">
            <Button
              /* Options */
              type={'primary'}
              size={'medium'}
              text={'Subscribe to Rendah Mag'}
              color={'black'}
              fluid={false}
              icon={'mail'}
              iconFloat={null}
              inverted={false}
              loading={false}
              disabled={false}
              onClick={null}
              /* Children */
              withLinkProps={subscribeWithLinkProps}
            />
          </div>
        </div>

        <LatestArticles range={[1, 24]} type="grid" padding="pt2  pb4" />
        <CategoryGrid padding="" />
      </main>
    );
  }
}

export default Home;
