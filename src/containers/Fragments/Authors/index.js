/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as action from './action';
import Loading from '../../../components/Loading';
import LatestAuthorList from '../../../components/AuthorList';


export class Authors extends PureComponent {
  componentDidMount() {
    this.props.fetchAuthorsIfNeeded();
  }

  renderLatestAuthorList = () => {
    const { authors } = this.props;

    if (
      !authors.readyStatus ||
      authors.readyStatus === action.AUTHORS_INVALID ||
      authors.readyStatus === action.AUTHORS_REQUESTING ||
      authors.readyStatus === action.AUTHORS_FAILURE
    ) {
      return <Loading type="Authors" />;
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
