/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { frontloadConnect } from 'react-frontload';
import compose from 'lodash/flowRight';

import * as action from './action';
import Loading from '../../../components/Loading';
import Author from '../../../components/Author';

export class AuthorInfo extends PureComponent {
  renderAuthor = () => {
    const { authorInfo, match: { params } } = this.props;
    const authorInfoById = authorInfo[params.id];

    if (
      !authorInfoById ||
      authorInfoById.readyStatus === action.AUTHOR_REQUESTING ||
      authorInfoById.readyStatus === action.AUTHOR_FAILURE
    ) {
      return <Loading type="AuthorInfo" />;
    }

    return <Author {...this.props} info={authorInfoById.info} />;
  }

  render() {
    return (
      <React.Fragment>
        {this.renderAuthor()}
      </React.Fragment>
    );
  }
}

const connector = connect(
  ({ authorInfo }) => ({ authorInfo }),
  dispatch => ({
    fetchAuthorIfNeeded: (id: string) => dispatch(action.fetchAuthorIfNeeded(id)),
  }),
);

AuthorInfo.propTypes = {
  authorInfo: PropTypes.shape({
    authorId: PropTypes.string,
    readyStatus: PropTypes.string,
    err: PropTypes.any,
    info: PropTypes.object,
  }),
  match: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

AuthorInfo.defaultProps = {
  authorInfo: {
    authorId: '',
    readyStatus: '',
    err: '',
    info: {},
  },
  match: [],
};

const frontload = props =>
  Promise.all([
    props.fetchAuthorIfNeeded(props.match.params.id),
  ]);

export default compose(
  connector,
  frontloadConnect(frontload, { onUpdate: false }),
)(AuthorInfo);
