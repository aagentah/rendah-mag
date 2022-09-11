import React from 'react';
import Router from 'next/router';
import { PageTransition } from 'next-page-transitions';
import NProgress from 'nprogress';
import { ParallaxProvider } from 'react-scroll-parallax';
import PlausibleProvider from 'next-plausible';
import { config, library } from '@fortawesome/fontawesome-svg-core';

import {
  faTwitter,
  faSoundcloud,
  faFacebook,
  faDiscord,
  faSpotify,
  faYoutube
} from '@fortawesome/free-brands-svg-icons';

import {
  faMusic,
  faArrowRight,
  faArrowLeft,
  faShoppingCart,
  faPlus,
  faDownload,
  faSignInAlt,
  faSignOutAlt,
  faStoreAlt,
  faEnvelope,
  faUser,
  faReceipt,
  faLock,
  faAt,
  faHashtag,
  faPencil,
  faChevronLeft,
  faChevronRight,
  faInfoCircle,
  faHeart,
  faMinus,
  faHouse,
  faFileAudio,
  faNewspaper,
  faList,
  faMoneyCheck
} from '@fortawesome/free-solid-svg-icons';
// import '@fortawesome/fontawesome-svg-core/styles.css';

import { AppProvider } from '~/context-provider/app';

import '~/styles/index.scss';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

// Performance metrics
// export function reportWebVitals(metric) {
//   console.log(metric);
// }

function MyApp({ Component, pageProps }) {
  const transitionTimeout = 300;
  config.autoAddCss = false;
  library.add(
    faTwitter,
    faSoundcloud,
    faFacebook,
    faDiscord,
    faSpotify,
    faYoutube,
    faMusic,
    faArrowRight,
    faArrowLeft,
    faShoppingCart,
    faPlus,
    faDownload,
    faSignInAlt,
    faSignOutAlt,
    faStoreAlt,
    faEnvelope,
    faUser,
    faReceipt,
    faLock,
    faAt,
    faHashtag,
    faPencil,
    faChevronLeft,
    faChevronRight,
    faInfoCircle,
    faHeart,
    faMinus,
    faHouse,
    faFileAudio,
    faNewspaper,
    faList,
    faMoneyCheck
  );

  return (
    <>
      <PlausibleProvider domain="rendahmag.com">
        <AppProvider>
          <ParallaxProvider>
            <PageTransition
              timeout={transitionTimeout}
              classNames="page-transition"
              loadingComponent={null}
              loadingDelay={transitionTimeout}
              loadingTimeout={{
                enter: transitionTimeout,
                exit: transitionTimeout
              }}
              loadingClassNames="loading-indicator"
            >
              <Component {...pageProps} />
            </PageTransition>
          </ParallaxProvider>
        </AppProvider>
      </PlausibleProvider>
    </>
  );
}

export default MyApp;
