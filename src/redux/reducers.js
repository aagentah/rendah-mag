/* @flow */

import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

// blog
import latestArticles from '../containers/Fragments/Blog/LatestArticles/reducer';
import featuredArticles from '../containers/Fragments/Blog/FeaturedArticles/reducer';
import extraArticles from '../containers/Fragments/Blog/ExtraArticles/reducer';
import searchArticles from '../containers/Fragments/Blog/SearchArticles/reducer';
import categoryArticles from '../containers/Fragments/Blog/CategoryArticles/reducer';
import articleInfo from '../containers/Fragments/Blog/ArticleInfo/reducer';
import teamMemberInfo from '../containers/Fragments/Blog/TeamMemberInfo/reducer';
import team from '../containers/Fragments/Blog/Team/reducer';

// studio
import latestStudioArticles from '../containers/Fragments/Studio/LatestArticles/reducer';

// store
import collections from '../containers/Fragments/Store/Collections/reducer';
import categories from '../containers/Fragments/Store/Categories/reducer';
import products from '../containers/Fragments/Store/Products/reducer';
import productInfo from '../containers/Fragments/Store/ProductInfo/reducer';

export default combineReducers({
  // blog
  latestArticles,
  featuredArticles,
  extraArticles,
  searchArticles,
  categoryArticles,
  articleInfo,
  teamMemberInfo,
  team,
  // studio
  latestStudioArticles,
  // store
  collections,
  categories,
  products,
  productInfo,
  //
  router,
});
