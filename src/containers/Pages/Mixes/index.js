/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';

import Hero from '../../../components/Hero';
import AnimatedImage from '../../../components/Elements/AnimatedImage';
import ExtraArticles from '../../../containers/Fragments/ExtraArticles';

export class WatchTower extends PureComponent {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  componentDidUpdate() {
    window.scrollTo(0, 0);
  }

  render() {
    const title = 'Mixes';
    const desc = 'Check out our Modules series featuring guest-mixes from upcomers within the scene.';
    const canonical = 'https://www.rendahmag.com/mixes';

    return (
      <main className="page-fade-in">
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={desc} />
          <link rel="canonical" href={canonical} />
        </Helmet>

        <Hero type="h1" title={title} styles="t-title  ttu  f3  bold  dark-grey" padding="pb3" />
        <div className="container-medium  center  pt4  pb4">
          <div className="flex  flex-wrap">
            <div className="col-24">
              <p className="t-body  dark-grey  f6  tac  mw6  db  center  pb2">
                {desc}
              </p>
            </div>
          </div>
          <div className="flex  flex-wrap  justify-center  pv4">
            <div className="col-6  pa3">
              <a className="db  shadow2  link" title="modules-001" href="https://soundcloud.com/rendahmag/rendah-mag-modules-001-susp3c" rel="noopener noreferrer" target="_blank">
                <AnimatedImage
                  lazy
                  src="https://res.cloudinary.com/dzz8ji5lj/image/upload/v1539000825/modules/modules-001.jpg"
                  alt="modules-001"
                  styles="fade-in-zoom-in  w-100"
                />
              </a>
            </div>
            <div className="col-6  pa3">
              <a className="db  shadow2  link" title="modules-002" href="https://soundcloud.com/rendahmag/rendah-modules-002-host" rel="noopener noreferrer" target="_blank">
                <AnimatedImage
                  lazy
                  src="https://res.cloudinary.com/dzz8ji5lj/image/upload/v1539000827/modules/modules-002.jpg"
                  alt="modules-002"
                  styles="fade-in-zoom-in  w-100"
                />
              </a>
            </div>
          </div>
        </div>

        <p className="t-title  bold  tac  f6  ttu  pb3">MORE ARTICLES</p>
        <ExtraArticles type="grid" limit={4} padding="pt3" />
      </main>
    );
  }
}

export default WatchTower;
