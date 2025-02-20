import { useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import { PageTransition } from 'next-page-transitions';
import NProgress from 'nprogress';
import { ParallaxProvider } from 'react-scroll-parallax';
import PlausibleProvider from 'next-plausible';
import { GoogleAnalytics } from '@next/third-parties/google';
import { config } from '@fortawesome/fontawesome-svg-core';

import { AppProvider } from '~/context-provider/app';
import {
  DarkModeProvider,
  useDarkMode,
} from '~/context-provider/dark-mode-context';

import '~/styles/index.scss';

import '@fortawesome/fontawesome-svg-core/styles.css';

import { useUser } from '~/lib/hooks';

config.autoAddCss = false;

// Custom hook to scroll to top on route change
const useScrollToTop = () => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      window.scrollTo(0, 0);
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router]);
};

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }) {
  const transitionTimeout = 300;
  const [user] = useUser();
  const GA_ID = 'G-73XW97XVPY';

  useEffect(() => {
    if (user?.email && typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', GA_ID, { user_id: user._id });
    }
  }, [user]);

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

  // Use scroll to top hook
  useScrollToTop();

  return (
    <PlausibleProvider domain="rendahmag.com">
      <GoogleAnalytics gaId={GA_ID} />
      <AppProvider>
        <ParallaxProvider>
          <DarkModeProvider>
            <ApplyDarkMode />
            {getLayout(<Component {...pageProps} />)}
          </DarkModeProvider>
        </ParallaxProvider>
      </AppProvider>
    </PlausibleProvider>
  );
}

export default MyApp;
