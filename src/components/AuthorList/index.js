/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export class AuthorList extends PureComponent {
  render() {
    return (
      <div className="container">
        <div className="row">
          {this.props.list.map(author => (
            <div key={author.name} className="col-sm-8  col-md-6  pv3  authorList__col">
              <figure className="rel  pb3  link  w-100  zoom-in-fade-in-iteration--cont">
                <Link to={`/author/${author.url}`} className="shadow2  authorList__img--cont  db">
                  <img className="mb3  center  zoom-in-fade-in-iteration--item  authorList__img" alt={author.name} src={`https://res.cloudinary.com/dzz8ji5lj/image/upload/${author.img}`} />
                </Link>
              </figure>
              <Link to={`/author/${author.url}`} className="authorList__title  link  black  t7  pt1  tac  cp  t-title">
                <span>{author.name}</span>
                <br />
                <span className="t8  grey">({author.alias})</span>
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
