/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Seo from './Seo';

// Export this for unit testing more easily
export class Article extends PureComponent {
  authorLinks = (i, link, text) => {
    switch (text) {
      case 'Facebook':
        return (
          <a key={i} className="" href={link} target="_blank">
            <img className="dib  pr3  author__social-link--icon" width="50" src={require('../../containers/App/assets/social/iconmonstr-facebook-5.png')} alt={text} />
          </a>
        );
      case 'Twitter':
        return (
          <a key={i} className="" href={link} target="_blank">
            <img className="dib  pr3  author__social-link--icon" width="50" src={require('../../containers/App/assets/social/iconmonstr-twitter-5.png')} alt={text} />
          </a>
        );
      case 'Instagram':
        return (
          <a key={i} className="" href={link} target="_blank">
            <img className="dib  pr3  author__social-link--icon" width="50" src={require('../../containers/App/assets/social/iconmonstr-instagram-5.png')} alt={text} />
          </a>
        );
      case 'Youtube':
        return (
          <a key={i} className="" href={link} target="_blank">
            <img className="dib  pr3  author__social-link--icon" width="50" src={require('../../containers/App/assets/social/iconmonstr-youtube-5.png')} alt={text} />
          </a>
        );
      case 'Soundcloud':
        return (
          <a key={i} className="" href={link} target="_blank">
            <img className="dib  pr3  author__social-link--icon" width="50" src={require('../../containers/App/assets/social/iconmonstr-soundcloud-5.png')} alt={text} />
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
      <div>
        {renderSeo}
        <div className="container  mv4  zoom-in-fade-in-iteration--cont">
          <div className="row">
            <div className="col-20  offset-2  col-md-16  offset-md-4">
              <div className="link  w-100  author__cont">
                <div className="center  pt3">
                  <div className="row  shadow2  br2">

                    <div className="col-md-6">
                      <figure className="rel  center  link  w-100  zoom-in-fade-in-iteration--cont  pb2-md">
                        <Link to={`/Author/${author.name.replace(/\s+/g, '-')}`} className="shadow2  author__img--cont  db">
                          <img className="mb3  center  w4  zoom-in-fade-in-iteration--item  author__img" alt={author.name} src={`https://res.cloudinary.com/dzz8ji5lj/image/upload/${author.img}`} />
                        </Link>
                      </figure>
                    </div>

                    <div className="col-md-18">
                      <Link to={`/Author/${author.name.replace(/\s+/g, '-')}`} className="link  black  t7  pt2  db  tac-md  cp  title-font  no-underline">
                        <span>{author.name}</span>
                        <span className="pl1  grey  t8">({author.alias})</span>
                      </Link>
                      <p className="grey  t8  pv2  tac-md">{author.description}</p>
                      <hr />
                      <div className="tac-md  pb2">
                        {author.links.map((link, i) => (
                          authorLinks(i, link.url, link.text)
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
