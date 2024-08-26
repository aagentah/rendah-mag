import { useEffect } from 'react';
import Router from 'next/router';
import { PageTransition } from 'next-page-transitions';
import NProgress from 'nprogress';
import { ParallaxProvider } from 'react-scroll-parallax';
import PlausibleProvider from 'next-plausible';

import { AppProvider } from '~/context-provider/app';
import {
  DarkModeProvider,
  useDarkMode,
} from '~/context-provider/dark-mode-context';

import '~/styles/index.scss';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }) {
  const transitionTimeout = 300;

  // ApplyDarkMode component with initial check
  const ApplyDarkMode = () => {
    const { darkMode } = useDarkMode();

    console.log('darkMode', darkMode);

    // Immediately apply dark mode class before first
    if (typeof document !== 'undefined') {
      if (darkMode) {
        document.documentElement.classList.add('dark-mode');
        document.body.classList.add('dark-mode');
      } else {
        document.documentElement.classList.remove('dark-mode');
        document.body.classList.remove('dark-mode');
      }
    }

    useEffect(() => {
      if (darkMode) {
        document.documentElement.classList.add('dark-mode');
        document.body.classList.add('dark-mode');
      } else {
        document.documentElement.classList.remove('dark-mode');
        document.body.classList.remove('dark-mode');
      }
    }, [darkMode]);

    return null; // This component doesn't render anything
  };

  // Ensure the same `Layout` is used across all pages with persistent dark mode
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <PlausibleProvider domain="rendahmag.com">
      <AppProvider>
        <ParallaxProvider>
          <DarkModeProvider>
            {/* Apply the dark mode class to html/body */}
            <ApplyDarkMode />
            {/* <PageTransition
              timeout={transitionTimeout}
              classNames="page-transition"
              loadingComponent={null}
              loadingDelay={transitionTimeout}
              loadingTimeout={{
                enter: transitionTimeout,
                exit: transitionTimeout,
              }}
              loadingClassNames="loading-indicator"
            > */}
            {getLayout(<Component {...pageProps} />)}
            {/* </PageTransition> */}
          </DarkModeProvider>
        </ParallaxProvider>
      </AppProvider>
    </PlausibleProvider>
  );
}

export default MyApp;
