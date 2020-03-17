/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import { Redirect } from 'react-router-dom';
import { Button, Heading, Copy } from 'rendah-pattern-library';

import LatestArticles from '../../../../containers/Fragments/Blog/LatestArticles';
import CategoryGrid from '../../../../components/CategoryGrid';
import ExtraArticles from '../../../../containers/Fragments/Blog/ExtraArticles';

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
      routerLink: Redirect,
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
              size={'small'}
              text={'Subscribe to Rendah Mag'}
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

        <div className="container-medium  center  pv2">
          <div className="flex  flex-wrap">
            <LatestArticles range={[1, 16]} type="grid" padding="ph3  pb2" />
          </div>
        </div>

        <div className="bg-dark-grey  mv4  mv5-md  pt4  pb4  pb5-md">
          <div className="container-medium  mla  mra  mv3">
            <div className="flex  pb2">
              <Heading
                /* Options */
                htmlEntity={'h4'}
                text={'Time capsule'}
                color={'white'}
                size={'x-large'}
                truncate={null}
                reveal
              />
            </div>
            <div className="flex  pb4">
              <div className="col-24  col-14-md">
                <Copy
                  /* Options */
                  text={'Some throwback features, still relevant as ever.'}
                  color={'white'}
                  size={'medium'}
                  truncate={null}
                />
              </div>
            </div>
          </div>

          <div className="container-medium  center  pv2">
            <div className="flex  flex-wrap">
              <ExtraArticles
                type="list"
                padding="ph3  pb2"
                range={[1, 10]}
                column="col-24  col-12-md"
                invert
              />
            </div>
          </div>
        </div>

        <CategoryGrid padding="" />
      </main>
    );
  }
}

export default Home;
