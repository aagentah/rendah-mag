/* @flow */

// Base
import HomePage from './containers/Pages/Base/Home';
import NotFoundPage from './containers/Pages/Base/NotFound';
import PrivacyPolicyPage from './containers/Pages/Base/PrivacyPolicy';
import SubscribePage from './containers/Pages/Base/Subscribe';
import WatchTowerPage from './containers/Pages/Base/WatchTower';
import SearchPage from './containers/Pages/Base/Search';

// Blog
import ArticlePage from './containers/Pages/Blog/Article';
import ArticlePreviewPage from './containers/Pages/Blog/ArticlePreview';
import CategoryPage from './containers/Pages/Blog/Category';
import TeamPage from './containers/Pages/Blog/Team';
import TeamMemberPage from './containers/Pages/Blog/TeamMember';

// Store
import StorePage from './containers/Pages/Store/Store';
import ProductPage from './containers/Pages/Store/Product';

// Studio
import StudioPage from './containers/Pages/Studio/Studio';
import StudioArticlePage from './containers/Pages/Studio/Article';

export default [
  {
    path: '/',
    exact: true,
    component: HomePage,
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
    path: '/article-preview/:id',
    component: ArticlePreviewPage,
  },
  {
    path: '/team/:id',
    component: TeamMemberPage,
  },
  {
    path: '/team',
    component: TeamPage,
  },
  {
    path: '/store/',
    exact: true,
    component: StorePage,
  },
  {
    path: '/store/:query',
    component: StorePage,
  },
  {
    path: '/product/:id',
    component: ProductPage,
  },
  {
    path: '/studio/',
    exact: true,
    component: StudioPage,
  },
  {
    path: '/studio/:id',
    component: StudioArticlePage,
  },
  {
    path: '/watch-tower',
    component: WatchTowerPage,
  },
  {
    path: '/subscribe',
    component: SubscribePage,
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
