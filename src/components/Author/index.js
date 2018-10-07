/* eslint-disable import/no-named-as-default, max-len */

import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import AnimatedImage from '../Elements/AnimatedImage';

import Seo from './Seo';

// Export this for unit testing more easily
export class Article extends PureComponent {
  render() {
    const { padding } = this.props;
    const author = this.props.info;
    const { socialHandles } = author;

    const isArticle = this.props.article;
    const containerClass = isArticle ? 'w-80-lg' : 'container-small  center';
    const borderClass = isArticle ? 'author__border  bt  bl-sm  bw2  bc-light-grey  pt4  pt0-md' : null;

    let { facebookLink, twitterLink, instagramLink, soundcloudLink } = false;

    if (socialHandles) {
      facebookLink = socialHandles.facebook ? (
        <a href={`https://facebook.com/${socialHandles.facebook}`} rel="noopener noreferrer" target="_blank">
          <img
            className="dib  pr2"
            width="35"
            src={require('../../containers/App/assets/social/iconmonstr-facebook-5.png')}
            alt={socialHandles.facebook}
          />
        </a>
      ) : (false);

      twitterLink = socialHandles.twitter ? (
        <a href={`https://twitter.com/${socialHandles.twitter}`} rel="noopener noreferrer" target="_blank">
          <img
            className="dib  pr2"
            width="35"
            src={require('../../containers/App/assets/social/iconmonstr-twitter-5.png')}
            alt={socialHandles.twitter}
          />
        </a>
      ) : (false);

      instagramLink = socialHandles.instagram ? (
        <a href={`https://instagram.com/${socialHandles.instagram}`} rel="noopener noreferrer" target="_blank">
          <img
            className="dib  pr2"
            width="35"
            src={require('../../containers/App/assets/social/iconmonstr-instagram-5.png')}
            alt={socialHandles.instagram}
          />
        </a>
      ) : (false);

      soundcloudLink = socialHandles.soundcloud ? (
        <a href={`https://soundcloud.com/${socialHandles.soundcloud}`} rel="noopener noreferrer" target="_blank">
          <img
            className="dib  pr2"
            width="35"
            src={require('../../containers/App/assets/social/iconmonstr-soundcloud-5.png')}
            alt={socialHandles.soundcloud}
          />
        </a>
      ) : (false);
    }

    return (
      <React.Fragment>

        {this.props.seo ? <Seo author={author} /> : null}

        <div className={`${containerClass}  ${padding}`}>
          <div className={`flex  flex-wrap  ${borderClass}`}>
            <div className="col-24  col-7-sm  col-6-md  pb4  pb0-sm">
              <figure>
                <Link
                  to={`/author/${author.slug}`}
                  className="link  db  h4  w4  center  shadow2  br-100"
                >
                  <AnimatedImage
                    lazy
                    src={author.img}
                    alt={author.name}
                    styles="fade-in-zoom-in  h4  w4  center  br-100"
                  />
                </Link>
              </figure>
            </div>

            <div className="col-22  col-17-sm  col-18-md  center">
              <div className="flex  flex-column  justify-center  h4">
                <Link
                  to={`/author/${author.slug}`}
                  className="link  black  f5  pt2  db  cp  t-title  no-underline  tac  tal-sm"
                >
                  <span>{author.name}</span>
                  <span className="pl1  grey  f5">({author.alias})</span>
                </Link>
                <p className="grey  f6  pt2  pb3  mb1  tac  tal-sm">{author.description}</p>
                <div className="tac  tal-sm">
                  {facebookLink}
                  {twitterLink}
                  {instagramLink}
                  {soundcloudLink}
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

Article.propTypes = {
  info: PropTypes.shape(),
  seo: PropTypes.bool,
  article: PropTypes.bool,
  padding: PropTypes.string,
};

Article.defaultProps = {
  info: {},
  seo: false,
  article: false,
  padding: '',
};

export default Article;
