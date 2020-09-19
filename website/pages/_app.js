import React from 'react';
import Router from 'next/router';
import { PageTransition } from 'next-page-transitions';
import NProgress from 'nprogress';
import { ToastProvider } from 'react-toast-notifications';
import { ParallaxProvider } from 'react-scroll-parallax';

import { AppProvider } from '~/context-provider/app';
import * as gtag from '~/lib/gtag';

import '~/styles/index.scss';
import 'keen-slider/keen-slider.min.css';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

// Track pageview when route is changed
Router.events.on('routeChangeComplete', (url) => gtag.pageview(url));

// Performance metrics
// export function reportWebVitals(metric) {
//   console.log(metric);
// }

function MyApp({ Component, pageProps }) {
  const transitionTimeout = 300;

  return (
    <>
      <AppProvider>
        <ToastProvider>
          <ParallaxProvider>
            <PageTransition
              timeout={transitionTimeout}
              classNames="page-transition"
              loadingComponent={null}
              loadingDelay={transitionTimeout}
              loadingTimeout={{
                enter: transitionTimeout,
                exit: transitionTimeout,
              }}
              loadingClassNames="loading-indicator"
            >
              <Component {...pageProps} />
            </PageTransition>
          </ParallaxProvider>
        </ToastProvider>
      </AppProvider>
    </>
  );
}

export default MyApp;
