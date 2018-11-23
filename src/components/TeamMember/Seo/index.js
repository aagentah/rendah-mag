/* @flow */
/* eslint-disable import/no-named-as-default, react/no-unknown-property */

import React, { PureComponent } from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';

export class Seo extends PureComponent {
  render() {
    const { teamMember } = this.props;

    return (
      <Helmet>
        <title>{teamMember.name}</title>
        <meta name="description" content={teamMember.description} />
        <link rel="canonical" href={`https://www.rendahmag.com/team/${teamMember.slug}`} />

        {/* Twitter  */}
        <meta name="twitter:title" content={teamMember.name} />
        <meta name="twitter:description" content={teamMember.description} />
        <meta name="twitter:image" content={teamMember.img} />

        {/* Open Graph data */}
        <meta property="og:title" content={teamMember.name} />
        <meta property="og:url" content={`https://www.rendahmag.com/team/${teamMember.slug}`} />
        <meta property="og:image" content={teamMember.img} />
        <meta property="og:image:width" content="1080" />
        <meta property="og:image:height" content="1080" />
        <meta property="og:description" content={teamMember.description} />
        <meta property="article:section" content="Team Member" />
      </Helmet>
    );
  }
}

Seo.propTypes = {
  teamMember: PropTypes.shape(),
};

Seo.defaultProps = {
  teamMember: {},
};

export default Seo;
