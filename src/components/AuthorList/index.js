/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import AnimatedImage from '../Elements/AnimatedImage';

export class AuthorList extends PureComponent {
  render() {
    const { padding } = this.props;

    return (
      <div className={`container-medium  center  ${padding}`}>
        <div className="flex  flex-wrap">
          {this.props.list.map(author => (
            <div key={author.name} className="col-24  col-12-sm  col-6-md  ph3  pb3">
              <figure className="rel  pb3  link  w-100">
                <Link to={`/author/${author.url}`} className="link  db  h4  w4  shadow2  center  br-100">
                  <AnimatedImage
                    lazy
                    src={`https://res.cloudinary.com/dzz8ji5lj/image/upload/${author.img}`}
                    alt={author.name}
                    styles="fade-in-zoom-in  h4  w4  center  br-100"
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
  padding: PropTypes.string,
};

AuthorList.defaultProps = {
  list: [],
  padding: '',
};

export default AuthorList;
