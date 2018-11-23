/* @flow */

import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

import latestArticles from '../containers/Fragments/LatestArticles/reducer';
import featuredArticles from '../containers/Fragments/FeaturedArticles/reducer';
import extraArticles from '../containers/Fragments/ExtraArticles/reducer';
import searchArticles from '../containers/Fragments/SearchArticles/reducer';
import categoryArticles from '../containers/Fragments/CategoryArticles/reducer';
import teamMemberArticles from '../containers/Fragments/TeamMemberArticles/reducer';
import articleInfo from '../containers/Fragments/ArticleInfo/reducer';
import teamMemberInfo from '../containers/Fragments/TeamMemberInfo/reducer';
import team from '../containers/Fragments/Team/reducer';

export default combineReducers({
  latestArticles,
  featuredArticles,
  extraArticles,
  searchArticles,
  categoryArticles,
  teamMemberArticles,
  articleInfo,
  teamMemberInfo,
  team,
  router,
});
