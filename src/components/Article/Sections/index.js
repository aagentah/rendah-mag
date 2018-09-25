/* @flow */
/* eslint-disable import/no-named-as-default, react/no-unknown-property */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// import Heading from './Heading';
import Paragraph from './Paragraph';
import BulletList from './BulletList';
import NumberedList from './NumberedList';
// import Image from './Image';
// import Question from './Question';
// import Answer from './Answer';
import Soundcloud from './Soundcloud';
import Spotify from './Spotify';
import Youtube from './Youtube';
import FacebookVideo from './FacebookVideo';
// import ArticleLink from './Link';

export class Seo extends PureComponent {
  renderSections = (section, i) => {
    // para
    if (section._type === 'block' && !section.listsection) {
      return (
        <div key={i}>
          <Paragraph text={section.children} />
        </div>
      );
    }

    // bullet list
    if (section._type === 'block' && section.listsection === 'bullet') {
      return (
        <ul key={i}>
          <BulletList text={section.children} />
        </ul>
      );
    }

    // number list
    if (section._type === 'block' && section.listsection === 'number') {
      return (
        <ul key={i}>
          <NumberedList text={section.children} />
        </ul>
      );
    }

    // soundcloud embed
    if (section._type === 'soundCloudEmbedBlock') {
      return (
        <div key={i} className="pv4">
          <Soundcloud url={section.soundCloudEmbed} />
        </div>
      );
    }

    // soundcloud embed
    if (section._type === 'spotifyEmbedBlock') {
      return (
        <div key={i} className="pv4">
          <Spotify uri={section.spotifyEmbed} />
        </div>
      );
    }

    // soundcloud embed
    if (section._type === 'youTubeEmbedBlock') {
      return (
        <div key={i} className="pv4">
          <Youtube videoId={section.youTubeEmbed} />
        </div>
      );
    }

    // facebook video embed
    if (section._type === 'facebookVideoEmbedBlock') {
      return (
        <div key={i} className="pv4">
          <FacebookVideo url={section.facebookVideoEmbed} />
        </div>
      );
    }

    return false;
  };

  render() {
    const { body } = this.props;

    return (
      <React.Fragment>
        {body.map((section, i) => this.renderSections(section, i))}
      </React.Fragment>
    );
  }
}

Seo.propTypes = {
  body: PropTypes.shape(),
};

Seo.defaultProps = {
  body: {},
};

export default Seo;
