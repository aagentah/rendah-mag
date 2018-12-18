/* @flow */
import HomePage from './containers/Pages/Home';
import SearchPage from './containers/Pages/Search';
import CategoryPage from './containers/Pages/Category';
import ArticlePage from './containers/Pages/Article';
import TeamMemberPage from './containers/Pages/TeamMember';
import NotFoundPage from './containers/Pages/NotFound';
// import StorePage from './containers/Pages/Store';
import TeamPage from './containers/Pages/Team';
import WatchTowerPage from './containers/Pages/WatchTower';
import MixesPage from './containers/Pages/Mixes';
import SubscribePage from './containers/Pages/Subscribe';
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
    path: '/team/:id',
    component: TeamMemberPage,
  },
  {
    path: '/team',
    component: TeamPage,
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
