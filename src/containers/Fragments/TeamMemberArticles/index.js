/* eslint-disable import/no-named-as-default */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { frontloadConnect } from 'react-frontload';
import compose from 'lodash/flowRight';

import * as action from './action';
import Loading from '../../../components/Loading';
import ArticleListGrid from '../../../components/ArticleList/Grid';


export class TeamMemberArticles extends PureComponent {
  renderTeamMemberArticleList = () => {
    const { teamMemberArticles } = this.props;

    if (
      !teamMemberArticles.readyStatus ||
      teamMemberArticles.readyStatus === action.TEAMMEMBERARTICLES_INVALID ||
      teamMemberArticles.readyStatus === action.TEAMMEMBERARTICLES_REQUESTING ||
      teamMemberArticles.readyStatus === action.TEAMMEMBERARTICLES_FAILURE
    ) {
      return <Loading type="TeamMemberArticles" />;
    }

    return <ArticleListGrid {...this.props} type="grid" list={teamMemberArticles.list} />;
  };

  render() {
    return (
      <React.Fragment>
        {this.renderTeamMemberArticleList()}
      </React.Fragment>
    );
  }
}

const connector = connect(
  ({ teamMemberArticles }) => ({ teamMemberArticles }),
  dispatch => ({
    fetchTeamMemberArticlesIfNeeded: (id: string) =>
      dispatch(action.fetchTeamMemberArticlesIfNeeded(id)),
  }),
);

TeamMemberArticles.propTypes = {
  teamMemberArticles: PropTypes.shape({
    readyStatus: PropTypes.string,
    err: PropTypes.any,
    list: PropTypes.arrayOf(PropTypes.object),
  }),
  match: PropTypes.shape(),
};

TeamMemberArticles.defaultProps = {
  teamMemberArticles: {
    readyStatus: '',
    err: '',
    list: [{}],
  },
  match: [],
  fetchTeamMemberArticlesIfNeeded: () => {},
};

const frontload = props =>
  Promise.all([
    props.fetchTeamMemberArticlesIfNeeded(props.match.params.id),
  ]);

export default compose(
  connector,
  frontloadConnect(frontload, { onUpdate: false }),
)(TeamMemberArticles);
