/* eslint-disable import/no-named-as-default,
  react/no-array-index-key,
  jsx-a11y/no-static-element-interactions,
  react/no-array-index-key,
  jsx-a11y/no-noninteractive-element-interactions */

import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export class AuthorList extends PureComponent {
  render() {
    return (
      <div className="container  mv4">
        <div className="row">
          {this.props.list.map((author, i) => (
            <Link to={`/Author/${author.name.replace(/\s+/g, '-')}`} key={i} className="link  w-100  zoom-in-fade-in-iteration--cont">
              <div className="col-sm-12  col-md-6  pv3  latestArticleList__col--latest">

                <figure className="rel  pb3">
                  <div className="shadow2  authorList__img--cont">
                    <img className="mb3  center  zoom-in-fade-in-iteration--item  authorList__img" alt={author.name} src={`http://res.cloudinary.com/dzz8ji5lj/image/upload/${author.img}`} />
                  </div>
                </figure>
                <h2 className="link  black  t7  pt2  tac  cp  title-font">{author.name}</h2>

              </div>
            </Link>
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
