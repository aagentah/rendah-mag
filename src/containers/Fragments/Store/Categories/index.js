/* eslint-disable import/no-named-as-default */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { frontloadConnect } from 'react-frontload';
import compose from 'lodash/flowRight';

import * as action from './action';
// import Loading from '../../../../components/Loading';
import SideList from '../../../../components/SideList';

export class Categories extends React.Component {
  shouldComponentUpdate() {
    return false;
  }

  renderCategorieList = () => {
    const { categories } = this.props;

    if (
      !categories.readyStatus ||
      categories.readyStatus === action.CATEGORIES_INVALID ||
      categories.readyStatus === action.CATEGORIES_REQUESTING ||
      categories.readyStatus === action.CATEGORIES_FAILURE
    ) {
      return false;
      // return <Loading type="Categories" />;
    }

    return <SideList {...this.props} list={categories.list} />;
  };

  render() {
    return <React.Fragment>{this.renderCategorieList()}</React.Fragment>;
  }
}

const connector = connect(
  ({ categories }) => ({ categories }),
  dispatch => ({
    fetchCategoriesIfNeeded: (range: Array) => dispatch(action.fetchCategoriesIfNeeded(range)),
  }),
);

Categories.propTypes = {
  categories: PropTypes.shape({
    readyStatus: PropTypes.string,
    err: PropTypes.any,
    list: PropTypes.arrayOf(PropTypes.object),
  }),
  type: PropTypes.string,
  range: PropTypes.arrayOf(PropTypes.number),
};

Categories.defaultProps = {
  categories: {
    readyStatus: '',
    err: '',
    list: [{}],
  },
  fetchCategoriesIfNeeded: () => {},
  type: '',
  range: [],
};

const frontload = props => Promise.all([props.fetchCategoriesIfNeeded(props.range)]);

export default compose(
  connector,
  frontloadConnect(frontload, { onUpdate: false }),
)(Categories);
