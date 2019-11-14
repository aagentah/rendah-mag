/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import { Heading, Copy } from 'rendah-pattern-library';

import TeamFragment from '../../../containers/Fragments/Blog/Team';

export class Team extends PureComponent {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  componentDidUpdate() {
    window.scrollTo(0, 0);
  }

  render() {
    const title = 'Team';
    const desc = 'Profiles of our team & editors.';
    const canonical = 'https://www.rendahmag.com/team';

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
              truncate={1}
              reveal={true}
            />
          </div>
          <div className="flex  pb2  ph3">
            <Copy
              /* Options */
              text={desc}
              color={'black'}
              size={'medium'}
              truncate={1}
            />
          </div>
        </div>

        <TeamFragment padding="pv4" />
      </main>
    );
  }
}

export default Team;
