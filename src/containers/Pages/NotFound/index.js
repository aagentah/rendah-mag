/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';

import Hero from '../../../components/Hero';
import ExtraArticles from '../../../containers/Fragments/ExtraArticles';
import CategoryGrid from '../../../components/CategoryGrid';

export class NotFound extends PureComponent {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  componentDidUpdate() {
    window.scrollTo(0, 0);
  }

  render() {
    const title = '404';
    const desc = '404, this page does not exist.';

    return (
      <main className="page-fade-in">
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={desc} />
        </Helmet>

        <Hero type="h1" title={title} styles="t-title  ttu  f3  bold  dark-grey" padding="pb4" />
        <div className="container-medium  center  pt4  pb4">
          <div className="flex  flex-wrap">
            <div className="col-24">
              <p className="t-body  dark-grey  f6  tac  mw6  db  center  pb2">
                {desc}
              </p>
            </div>
          </div>
        </div>
        <ExtraArticles type="grid" limit={4} padding="pt3" />
        <CategoryGrid padding="pt4" />
      </main>
    );
  }
}

export default NotFound;
