import { useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import { PageTransition } from 'next-page-transitions';
import NProgress from 'nprogress';
import { ParallaxProvider } from 'react-scroll-parallax';
import PlausibleProvider from 'next-plausible';
import Script from 'next/script';

import { AppProvider } from '~/context-provider/app';
import {
  DarkModeProvider,
  useDarkMode,
} from '~/context-provider/dark-mode-context';

import '~/styles/index.scss';

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
      <AppProvider>
        <ParallaxProvider>
          <DarkModeProvider>
            <ApplyDarkMode />
            {process.env.NODE_ENV === 'production' && (
              <Script id="hotjar" strategy="afterInteractive">
                {`
                (function(h,o,t,j,a,r){
                    h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                    h._hjSettings={hjid:837317,hjsv:6};
                    a=o.getElementsByTagName('head')[0];
                    r=o.createElement('script');r.async=1;
                    r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                    a.appendChild(r);
                })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
              `}
              </Script>
            )}
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
