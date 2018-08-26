/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Seo from './Seo';
import AnimatedImage from '../Elements/AnimatedImage';

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
    const author = this.props.info;
    const authorLinks = this.authorLinks;
    const renderSeo = (this.props.seo) ? <Seo data={author} /> : null;
    return (
      <React.Fragment>
        {renderSeo}
        <div className="container-small  center">
          <div className="flex  flex-wrap">

            <div className="col-24  col-4-md  pb3  pb0-md">
              <figure>
                <Link to={`/author/${author.url}`} className="link  db  h4  w4  shadow2  br-100">
                  <AnimatedImage
                    lazy
                    src={`https://res.cloudinary.com/dzz8ji5lj/image/upload/${author.img}`}
                    alt={author.name}
                    styles="fade-in-zoom-in  h4  w4  br-100"
                  />
                </Link>
              </figure>
            </div>

            <div className="col-24  col-20-md">
              <div className="flex  flex-column  justify-center  h4">
                <Link to={`/author/${author.url}`} className="link  black  t7  pt3  db  cp  t-title  no-underline">
                  <span>{author.name}</span>
                  <span className="pl1  grey  t8">({author.alias})</span>
                </Link>
                <p className="grey  t8  pt2  pb3">{author.description}</p>
                <div>
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
};

Article.defaultProps = {
  info: {},
  seo: false,
};

export default Article;
