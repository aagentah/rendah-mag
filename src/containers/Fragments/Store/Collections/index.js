/* eslint-disable import/no-named-as-default */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { frontloadConnect } from 'react-frontload';
import compose from 'lodash/flowRight';

import * as action from './action';
// import Loading from '../../../../components/Loading';
import SideList from '../../../../components/SideList';

export class Collections extends React.Component {
  shouldComponentUpdate() {
    return false;
  }

  renderCollectionList = () => {
    const { collections } = this.props;

    if (
      !collections.readyStatus ||
      collections.readyStatus === action.COLLECTIONS_INVALID ||
      collections.readyStatus === action.COLLECTIONS_REQUESTING ||
      collections.readyStatus === action.COLLECTIONS_FAILURE
    ) {
      return false;
      // return <Loading type="Collections" />;
    }

    return <SideList {...this.props} list={collections.list} />;
  };

  render() {
    return <React.Fragment>{this.renderCollectionList()}</React.Fragment>;
  }
}

const connector = connect(
  ({ collections }) => ({ collections }),
  dispatch => ({
    fetchCollectionsIfNeeded: (range: Array) => dispatch(action.fetchCollectionsIfNeeded(range)),
  }),
);

Collections.propTypes = {
  collections: PropTypes.shape({
    readyStatus: PropTypes.string,
    err: PropTypes.any,
    list: PropTypes.arrayOf(PropTypes.object),
  }),
  type: PropTypes.string,
  range: PropTypes.arrayOf(PropTypes.number),
};

Collections.defaultProps = {
  collections: {
    readyStatus: '',
    err: '',
    list: [{}],
  },
  fetchCollectionsIfNeeded: () => {},
  type: '',
  range: [],
};

const frontload = props => Promise.all([props.fetchCollectionsIfNeeded(props.range)]);

export default compose(
  connector,
  frontloadConnect(frontload, { onUpdate: false }),
)(Collections);
