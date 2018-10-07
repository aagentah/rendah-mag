/* @flow */
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
  },
  {
    path: '/search/:query',
    component: SearchPage,
  },
  {
    path: '/category/:query',
    component: CategoryPage,
  },
  {
    path: '/article/:id',
    component: ArticlePage,
  },
  {
    path: '/author/:id',
    component: AuthorPage,
  },
  {
    path: '/authors',
    component: AuthorsPage,
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
