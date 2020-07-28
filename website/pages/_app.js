import React from 'react';
import Router from 'next/router';
import { PageTransition } from 'next-page-transitions';
import NProgress from 'nprogress';
import { ToastProvider } from 'react-toast-notifications';

import { AppProvider } from '../context-provider/app';

import '../styles/index.scss';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }) {
  const transitionTimeout = 300;

  return (
    <>
      <AppProvider>
        <ToastProvider>
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
        </ToastProvider>
      </AppProvider>
    </>
  );
}

export default MyApp;
