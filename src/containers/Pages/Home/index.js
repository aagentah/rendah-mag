/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import { Hero, Image, Button } from 'rendah-pattern-library';

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

    const withLinkProps = {
      type: 'internal',
      url: '/',
      target: '_top',
      routerLink: Link,
    };

    const subscribeWithLinkProps = {
      type: 'internal',
      url: '/subscribe',
      target: '_top',
      routerLink: Link,
    };

    const heroImageDesktop = (
      <Image
        /* Options */
        src={'https://res.cloudinary.com/dzz8ji5lj/image/upload/v1569520981/shop/subscribe-banner-desktop_2.png'}
        placeholder={null}
        alt={'Rendah Mag Issue: 001'}
        figcaption={null}
        height={null}
        onClick={null}
        /* Children */
        withLinkProps={withLinkProps}
      />
    );

    const heroImageMobile = (
      <Image
        /* Options */
        src={'https://res.cloudinary.com/dzz8ji5lj/image/upload/v1569520983/shop/subscribe-banner-mobile_1.png'}
        placeholder={null}
        alt={'Rendah Mag Issue: 001'}
        figcaption={null}
        height={null}
        onClick={null}
        /* Children */
        withLinkProps={withLinkProps}
      />
    );

    return (
      <main className="page-fade-in">
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={desc} />
          <link rel="canonical" href={canonical} />
        </Helmet>

        <h1 className="dn">Home</h1>

        <div className="container-medium  center  pt4">
          <div className="dn  db-md">
            <Hero
              /* Options */
              color={'black'}
              height={null}
              /* Children */
              image={heroImageDesktop}
              title={null}
              description={null}
              button={null}
            />
          </div>

          <div className="db  dn-md">
            <Hero
              /* Options */
              color={'black'}
              height={null}
              /* Children */
              image={heroImageMobile}
              title={null}
              description={null}
              button={null}
            />
          </div>
        </div>

        <div className="container-medium  center  mt2  pt4  pb4">
          <div className="col-24  tac">
            <Button
              /* Options */
              type={'primary'}
              size={'large'}
              text={'Subscribe to our Newsletter'}
              color={'black'}
              fluid={false}
              icon={null}
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
