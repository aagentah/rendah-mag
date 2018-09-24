/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import AnimatedImage from '../Elements/AnimatedImage';

import Seo from './Seo';

// Export this for unit testing more easily
export class Article extends PureComponent {
  authorLinks = (i, link, text) => {
    switch (text) {
      case 'Facebook':
        return (
          <a key={i} className="" href={link} target="_blank">
            <img className="dib  pr2" width="35" src={require('../../containers/App/assets/social/iconmonstr-facebook-5.png')} alt={text} />
          </a>
        );
      case 'Twitter':
        return (
          <a key={i} className="" href={link} target="_blank">
            <img className="dib  pr2" width="35" src={require('../../containers/App/assets/social/iconmonstr-twitter-5.png')} alt={text} />
          </a>
        );
      case 'Instagram':
        return (
          <a key={i} className="" href={link} target="_blank">
            <img className="dib  pr2" width="35" src={require('../../containers/App/assets/social/iconmonstr-instagram-5.png')} alt={text} />
          </a>
        );
      case 'Youtube':
        return (
          <a key={i} className="" href={link} target="_blank">
            <img className="dib  pr2" width="35" src={require('../../containers/App/assets/social/iconmonstr-youtube-5.png')} alt={text} />
          </a>
        );
      case 'Soundcloud':
        return (
          <a key={i} className="" href={link} target="_blank">
            <img className="dib  pr2" width="35" src={require('../../containers/App/assets/social/iconmonstr-soundcloud-5.png')} alt={text} />
          </a>
        );
      default:
        return <a key={i} className="link  pr3  t8  fornt-normal-a  dark-grey  author__social-link" href={link} target="_blank">{text}</a>;
    }
  }

  render() {
    const { padding } = this.props;
    const author = this.props.info;
    const authorLinks = this.authorLinks;
    const isArticle = this.props.article;
    const renderSeo = (this.props.seo) ? <Seo author={author} /> : null;
    const containerClass = (isArticle) ? 'w-80-lg' : 'container-small  center';
    const borderClass = (isArticle) ? 'author__border  bt  bl-sm  bw2  bc-light-grey  pt4  pt0-md' : null;

    return (
      <React.Fragment>
        {renderSeo}
        <div className={`${containerClass}  ${padding}`}>
          <div className={`flex  flex-wrap  ${borderClass}`}>

            <div className="col-24  col-7-sm  col-6-md  pb4  pb0-sm">
              <figure>
                <Link to={`/author/${author.url}`} className="link  db  h4  w4  center  shadow2  br-100">
                  <AnimatedImage
                    lazy
                    src={`https://res.cloudinary.com/dzz8ji5lj/image/upload/${author.img}`}
                    alt={author.name}
                    styles="fade-in-zoom-in  h4  w4  center  br-100"
                  />
                </Link>
              </figure>
            </div>

            <div className="col-22  col-17-sm  col-18-md  center">
              <div className="flex  flex-column  justify-center  h4">
                <Link to={`/author/${author.url}`} className="link  black  f5  pt2  db  cp  t-title  no-underline  tac  tal-sm">
                  <span>{author.name}</span>
                  <span className="pl1  grey  f5">({author.alias})</span>
                </Link>
                <p className="grey  f6  pt2  pb3  mb1  tac  tal-sm">{author.description}</p>
                <div className="tac  tal-sm">
                  {author.links.map((link, i) => (
                    authorLinks(i, link.url, link.text)
                  ))}
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
