/* @flow */

import type { Dispatch } from './types';

import { fetchLatestArticlesIfNeeded } from './containers/Fragments/LatestArticles/action';
import { fetchWeekArticlesIfNeeded } from './containers/Fragments/WeekArticles/action';
import { fetchExtraArticlesIfNeeded } from './containers/Fragments/ExtraArticles/action';
import { fetchSearchArticlesIfNeeded } from './containers/Fragments/SearchArticles/action';
import { fetchCategoryArticlesIfNeeded } from './containers/Fragments/CategoryArticles/action';
import { fetchAuthorArticlesIfNeeded } from './containers/Fragments/AuthorArticles/action';
import { fetchArticleIfNeeded } from './containers/Fragments/ArticleInfo/action';
import { fetchAuthorIfNeeded } from './containers/Fragments/AuthorInfo/action';
import { fetchAuthorsIfNeeded } from './containers/Fragments/Authors/action';

import HomePage from './containers/Pages/Home';
import SearchPage from './containers/Pages/Search';
import CategoryPage from './containers/Pages/Category';
import ArticlePage from './containers/Pages/Article';
import AuthorPage from './containers/Pages/Author';
import NotFoundPage from './containers/Pages/NotFound';
// import StorePage from './containers/Pages/Store';
import AuthorsPage from './containers/Pages/Authors';
import WatchTowerPage from './containers/Pages/WatchTower';
import MixesPage from './containers/Pages/Mixes';
import PrivacyPolicyPage from './containers/Pages/PrivacyPolicy';

export default [
  {
    path: '/',
    exact: true,
    component: HomePage, // Add your route here
    loadData: (dispatch: Dispatch) => Promise.all([
      dispatch(fetchLatestArticlesIfNeeded()),
      dispatch(fetchExtraArticlesIfNeeded()),
      dispatch(fetchWeekArticlesIfNeeded()), // Register your server-side call action(s) here
    ]),
  },
  {
    path: '/search/:query',
    component: SearchPage,
    loadData: (dispatch: Dispatch, params: Object) => Promise.all([
      dispatch(fetchSearchArticlesIfNeeded(params.query)),
    ]),
  },
  {
    path: '/category/:query',
    component: CategoryPage,
    loadData: (dispatch: Dispatch, params: Object) => Promise.all([
      dispatch(fetchCategoryArticlesIfNeeded(params.query)),
    ]),
  },
  {
    path: '/article/:id',
    component: ArticlePage,
    loadData: (dispatch: Dispatch, params: Object) => Promise.all([
      dispatch(fetchArticleIfNeeded(params.id)),
      dispatch(fetchAuthorArticlesIfNeeded(params.id)),
    ]),
  },
  {
    path: '/author/:id',
    component: AuthorPage,
    loadData: (dispatch: Dispatch, params: Object) => Promise.all([
      dispatch(fetchAuthorIfNeeded(params.id)),
    ]),
  },
  {
    path: '/authors',
    component: AuthorsPage,
    loadData: (dispatch: Dispatch) => Promise.all([
      dispatch(fetchAuthorsIfNeeded()),
    ]),
  },
  // {
  //   path: '/store',
  //   component: StorePage,
  // },
  {
    path: '/watch-tower',
    component: WatchTowerPage,
  },
  {
    path: '/mixes',
    component: MixesPage,
  },
  {
    path: '/privacy-policy',
    component: PrivacyPolicyPage,
  },
  {
    path: '*',
    component: NotFoundPage,
  },
];
