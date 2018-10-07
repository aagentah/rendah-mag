/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { frontloadConnect } from 'react-frontload';
import compose from 'lodash/flowRight';

import * as action from './action';
import Loading from '../../../components/Loading';
import LatestAuthorList from '../../../components/AuthorList';


export class Authors extends PureComponent {
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

    return <LatestAuthorList {...this.props} list={authors.list} />;
  };

  render() {
    return (
      <React.Fragment>
        {this.renderLatestAuthorList()}
      </React.Fragment>
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
};

Authors.defaultProps = {
  authors: {
    readyStatus: '',
    err: '',
    list: [{}],
  },
};

const frontload = props =>
  Promise.all([
    props.fetchAuthorsIfNeeded(),
  ]);

export default compose(
  connector,
  frontloadConnect(frontload, { onUpdate: false }),
)(Authors);
