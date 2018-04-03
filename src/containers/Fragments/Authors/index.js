/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as action from './action';
import LatestAuthorList from '../../../components/AuthorList';

// Export this for unit testing more easily
export class Authors extends PureComponent {
  componentDidMount() {
    this.props.fetchAuthorsIfNeeded();
  }

  renderLatestAuthorList = () => {
    const { authors } = this.props;

    if (
      !authors.readyStatus ||
      authors.readyStatus === action.AUTHORS_INVALID ||
      authors.readyStatus === action.AUTHORS_REQUESTING
    ) {
      return <div className="vh-100" />;
    }

    if (authors.readyStatus === action.AUTHORS_FAILURE) {
      return <div />;
    }

    return <LatestAuthorList list={authors.list} />;
  };

  render() {
    return (
      <div>
        {this.renderLatestAuthorList()}
      </div>
    );
  }
}

const connector = connect(
  ({ authors }) => ({ authors }),
  dispatch => ({
    fetchAuthorsIfNeeded: () => dispatch(action.fetchAuthorsIfNeeded()),
  }),
);

Authors.propTypes = {
  authors: PropTypes.shape({
    readyStatus: PropTypes.string,
    err: PropTypes.any,
    list: PropTypes.arrayOf(PropTypes.object),
  }),
  fetchAuthorsIfNeeded: PropTypes.func,
};

Authors.defaultProps = {
  authors: {
    readyStatus: '',
    err: '',
    list: [{}],
  },
  fetchAuthorsIfNeeded: () => {},
};

export default connector(Authors);
