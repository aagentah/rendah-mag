/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import AnimatedImage from '../Elements/AnimatedImage';

export class AuthorList extends PureComponent {
  render() {
    return (
      <div className="container-medium  center">
        <div className="flex  flex-wrap">
          {this.props.list.map(author => (
            <div key={author.name} className="col-24  col-12-sm  col-6-md  ph3">
              <figure className="rel  pb3  link  w-100">
                <Link to={`/author/${author.url}`} className="shadow2  db">
                  <AnimatedImage
                    lazy
                    src={`https://res.cloudinary.com/dzz8ji5lj/image/upload/${author.img}`}
                    alt={author.name}
                    styles="fade-in-zoom-in  h7  h7-sm  w-100"
                  />
                </Link>
              </figure>
              <Link to={`/author/${author.url}`} className="t-title  black  f6  link  db  pt1  pb3  tac  cp">
                <span className="db">{author.name}</span>
                <span className="db  t8  grey  pt1">({author.alias})</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

AuthorList.propTypes = {
  list: PropTypes.array, // eslint-disable-line react/forbid-prop-types
};

AuthorList.defaultProps = {
  list: [],
};

export default AuthorList;
