import React from 'react';
import Router from 'next/router';
import { PageTransition } from 'next-page-transitions';
import NProgress from 'nprogress';
import { ParallaxProvider } from 'react-scroll-parallax';
import PlausibleProvider from 'next-plausible';
import { config } from '@fortawesome/fontawesome-svg-core';

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
  config.autoAddCss = false;
  const transitionTimeout = 300;

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
