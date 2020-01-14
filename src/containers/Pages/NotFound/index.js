/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import { Heading, Copy } from 'rendah-pattern-library';

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
    const canonical = 'https://www.rendahmag.com/404';

    return (
      <main className="page-fade-in">
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={desc} />
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
              text={desc}
              color={'black'}
              size={'medium'}
              truncate={null}
            />
          </div>
        </div>
      </main>
    );
  }
}

export default NotFound;
