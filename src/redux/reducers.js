/* @flow */

import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

import latestArticles from '../containers/Fragments/LatestArticles/reducer';
import featuredArticles from '../containers/Fragments/FeaturedArticles/reducer';
import extraArticles from '../containers/Fragments/ExtraArticles/reducer';
import searchArticles from '../containers/Fragments/SearchArticles/reducer';
import categoryArticles from '../containers/Fragments/CategoryArticles/reducer';
import articleInfo from '../containers/Fragments/ArticleInfo/reducer';
import teamMemberInfo from '../containers/Fragments/TeamMemberInfo/reducer';
import team from '../containers/Fragments/Team/reducer';
import collections from '../containers/Fragments/Store/Collections/reducer';
import categories from '../containers/Fragments/Store/Categories/reducer';
import products from '../containers/Fragments/Store/Products/reducer';
import productInfo from '../containers/Fragments/Store/ProductInfo/reducer';

export default combineReducers({
  latestArticles,
  featuredArticles,
  extraArticles,
  searchArticles,
  categoryArticles,
  articleInfo,
  teamMemberInfo,
  team,
  //
  collections,
  categories,
  products,
  productInfo,
  //
  router,
});
