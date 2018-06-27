/* @flow */
/* eslint-disable import/no-named-as-default, react/no-unknown-property */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Heading from './Heading';
import Paragraph from './Paragraph';
import Image from './Image';
import Question from './Question';
import Answer from './Answer';
import BulletList from './BulletList';
import NumberedList from './NumberedList';
import Soundcloud from './Soundcloud';
import Spotify from './Spotify';
import Youtube from './Youtube';
import FacebookVideo from './FacebookVideo';
import ArticleLink from './Link';

export class Seo extends PureComponent {
  sections = (item, i) => {
    if (item) {
      switch (item.section.type) {
        case 'heading':
          return (
            <div key={i} className="pv3">
              <Heading text={item.section.text} />
            </div>
          );
        case 'paragraph':
          return (
            <div key={i} className="pv3">
              <Paragraph text={item.section.text} />
            </div>
          );
        case 'image':
          return (
            <div key={i} className="pv3">
              <Image img={item.section.img} />
            </div>
          );
        case 'question':
          return (
            <div key={i} className="pt3  pb2">
              <Question text={item.section.text} />
            </div>
          );
        case 'answer':
          return (
            <div key={i} className="pv3">
              <Answer text={item.section.text} />
            </div>
          );
        case 'bulletList':
          return (
            <div key={i} className="pb3">
              <BulletList
                text={item.section.text}
                list={item.section.list}
              />
            </div>
          );
        case 'numberedList':
          return (
            <div key={i} className="pb3">
              <NumberedList
                text={item.section.text}
                list={item.section.list}
              />
            </div>
          );
        case 'soundcloud':
          return (
            <div key={i} className="pv3">
              <Soundcloud url={item.section.url} />
            </div>
          );
        case 'spotify':
          return (
            <div key={i} className="pv3  mv2">
              <Spotify uri={item.section.uri} />
            </div>
          );
        case 'youtube':
          return (
            <div key={i} className="pv3  mv2">
              <Youtube videoId={item.section.url} />
            </div>
          );
        case 'FacebookVideo':
          return (
            <div key={i} className="pv3  mv2">
              <FacebookVideo url={item.section.url} />
            </div>
          );
        case 'link':
          return (
            <div key={i} className="pt3  pb1">
              <ArticleLink
                linkType={item.section.linkType}
                text={item.section.text}
                url={item.section.url}
              />
            </div>
          );
        default:
          return false;
      }
    }
    return false;
  }

  render() {
    const sections = this.sections;

    return (
      <React.Fragment>
        {this.props.data.map((item, i) => (
          sections(item, i)
        ))}
      </React.Fragment>
    );
  }
}

Seo.propTypes = {
  data: PropTypes.shape(),
};

Seo.defaultProps = {
  data: {},
};

export default Seo;
