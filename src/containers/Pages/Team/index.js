/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import { Hero, Image, Heading, Copy } from 'rendah-pattern-library';

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

    const heroImage = (
      <Image
        /* Options */
        src={'https://previews.123rf.com/images/banphote/banphote1902/banphote190201692/117340644-grunge-black-and-white-background-distress-overlay-texture-for-your-design-.jpg'}
        placeholder={'https://via.placeholder.com/500x500'}
        alt={'Team'}
        figcaption={null}
        height={250}
        onClick={null}
      />
    );

    const heroHeading = (
      <Heading
        /* Options */
        htmlEntity={'h1'}
        text={title}
        color={'black'}
        size={'x-large'}
        truncate={1}
      />
    );

    const heroCopy = (
      <Copy
        /* Options */
        text={desc}
        color={'black'}
        size={'medium'}
        truncate={1}
      />
    );

    return (
      <main className="page-fade-in">
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={desc} />
          <link rel="canonical" href={canonical} />
        </Helmet>

        <Hero
          /* Options */
          color={'black'}
          height={250}
          /* Children */
          image={heroImage}
          title={heroHeading}
          description={heroCopy}
          button={null}
        />
        <TeamFragment padding="pv4" />
      </main>
    );
  }
}

export default Team;
