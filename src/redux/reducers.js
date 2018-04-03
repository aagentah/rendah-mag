/* @flow */

import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

import latestArticles from '../containers/Fragments/LatestArticles/reducer';
import weekArticles from '../containers/Fragments/WeekArticles/reducer';
import extraArticles from '../containers/Fragments/ExtraArticles/reducer';
import searchArticles from '../containers/Fragments/SearchArticles/reducer';
import categoryArticles from '../containers/Fragments/CategoryArticles/reducer';
import authorArticles from '../containers/Fragments/AuthorArticles/reducer';
import articleInfo from '../containers/Fragments/ArticleInfo/reducer';
import authorInfo from '../containers/Fragments/AuthorInfo/reducer';
import authors from '../containers/Fragments/Authors/reducer';

export default combineReducers({
  latestArticles,
  weekArticles,
  extraArticles,
  searchArticles,
  categoryArticles,
  authorArticles,
  articleInfo,
  authorInfo,
  authors,
  router,
});
