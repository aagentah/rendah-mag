import React from 'react';
import Router from 'next/router';
import { PageTransition } from 'next-page-transitions';
import NProgress from 'nprogress';
import { ParallaxProvider } from 'react-scroll-parallax';
import PlausibleProvider from 'next-plausible';

import { AppProvider } from '~/context-provider/app';

import '~/styles/index.scss';
import 'keen-slider/keen-slider.min.css';
import 'react-toastify/dist/ReactToastify.css';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

// Performance metrics
// export function reportWebVitals(metric) {
//   console.log(metric);
// }

function MyApp({ Component, pageProps }) {
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
                exit: transitionTimeout,
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
