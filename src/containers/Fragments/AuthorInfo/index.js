/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as action from './action';
import Loading from '../../../components/Loading';
import Author from '../../../components/Author';


export class AuthorInfo extends PureComponent {
  componentDidMount() {
    const { fetchAuthorIfNeeded, match: { params } } = this.props;

    fetchAuthorIfNeeded(params.id);

    const id = this.props.match.params.id;
    this.props.fetchAuthorIfNeeded(id);
  }

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

    return <Author info={authorInfoById.info} seo={this.props.seo} />;
  }

  render() {
    return (
      <div>
        {this.renderAuthor()}
      </div>
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
  fetchAuthorIfNeeded: PropTypes.func,
  seo: PropTypes.bool,
};

AuthorInfo.defaultProps = {
  authorInfo: {
    authorId: '',
    readyStatus: '',
    err: '',
    info: {},
  },
  match: [],
  fetchAuthorIfNeeded: () => {},
  seo: true,
};

export default connector(AuthorInfo);
