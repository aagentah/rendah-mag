/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';

import Hero from '../../../components/Hero';
import AuthorsFragment from '../../../containers/Fragments/Authors';

export class Authors extends PureComponent {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  componentDidUpdate() {
    window.scrollTo(0, 0);
  }

  render() {
    const title = 'Authors';
    const desc = 'The Rendah Team is constantly growing, Get involved!';
    const canonical = 'https://www.rendahmag.com/authors';

    return (
      <main className="page-fade-in">
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={desc} />
          <link rel="canonical" href={canonical} />
        </Helmet>

        <Hero type="h1" title={title} styles="t-title  ttu  f3  bold  dark-grey" padding="pb3" />
        <AuthorsFragment padding="pv4" />
      </main>
    );
  }
}

export default Authors;
