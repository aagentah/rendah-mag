/* @flow */
/* eslint-disable import/no-named-as-default, react/no-array-index-key, react/self-closing-comp */

import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Seo from './Seo';

// Export this for unit testing more easily
export class ArticleCard extends PureComponent {
  render() {
    const author = this.props.info;

    return (
      <div>
        <Seo data={author} />
        <div className="container  mv4  zoom-in-fade-in-iteration--cont">
          <div className="row">
            <div className="col-xs-20  col-xs-offset-2  col-md-16  col-md-offset-4">
              <div className="row  shadow2  br2">
                <div className="link  w-100  authorCard__cont">
                  <div className="center  pt3">

                    <div className="col-md-6">
                      <figure className="rel  pb3  center">
                        <div className="shadow2  authorCard__img--cont">
                          <img className="mb3  center  w4  zoom-in-fade-in-iteration--item  authorCard__img" alt={author.name} src={`http://res.cloudinary.com/dzz8ji5lj/image/upload/${author.img}`} />
                        </div>
                      </figure>
                    </div>

                    <div className="col-md-18">
                      <Link to={`/Author/${author.name.replace(/\s+/g, '-')}`} className="link  black  t7  pt2  db  tac-md  cp  title-font  fw6  no-underline">{author.name}</Link>
                      <p className="grey  t8  pv2  tac-md">{author.description}</p>
                      <hr />
                      <div className="tac-md  pb2">
                        {author.links.map((link, i) => (
                          <a key={i} className="link  pr3  t8  fornt-normal-a  dark-grey  authorCard__social-link" href={link.url} target="_blank">{link.text}</a>
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

ArticleCard.propTypes = {
  info: PropTypes.shape(),
};

ArticleCard.defaultProps = {
  info: {},
};

export default ArticleCard;
