/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Item from './Item';

export class AuthorList extends PureComponent {
  render() {
    const { list, padding } = this.props;

    return (
      <div className={`container-medium  center  ${padding}`}>
        <div className="flex  flex-wrap">
          {list.map(author => (
            <Item key={author.name} author={author} />
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
