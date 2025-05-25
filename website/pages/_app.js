import { useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import { PageTransition } from 'next-page-transitions';
import NProgress from 'nprogress';
import { ParallaxProvider } from 'react-scroll-parallax';
import PlausibleProvider from 'next-plausible';
import { GoogleAnalytics } from '@next/third-parties/google';
import { config } from '@fortawesome/fontawesome-svg-core';
import { useUser } from '~/lib/hooks';
import Script from 'next/script';

import { AppProvider } from '~/context-provider/app';
import {
  DarkModeProvider,
  useDarkMode,
} from '~/context-provider/dark-mode-context';

import '~/styles/index.scss';

import '@fortawesome/fontawesome-svg-core/styles.css';

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

  // --- Meta Pixel (Facebook) Integration using next/script (robust version) ---
  const isProduction = process.env.NODE_ENV === 'production';

  // SPA navigation: track PageView on route change, only if fbq is available
  useEffect(() => {
    if (!isProduction) return;
    const handleRouteChange = () => {
      if (window.fbq) {
        window.fbq('track', 'PageView');
      } else {
        // Fallback: try again after a short delay if fbq isn't ready
        setTimeout(() => {
          if (window.fbq) {
            window.fbq('track', 'PageView');
          }
        }, 500);
      }
    };
    Router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      Router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [isProduction]);
  // --- End Meta Pixel Integration ---

  return (
    <>
      {/* Facebook Pixel: base code */}
      {isProduction && (
        <>
          <Script
            id="facebook-pixel-base"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;
                n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
              `,
            }}
          />
          {/* Facebook Pixel: init and first PageView event */}
          <Script
            id="facebook-pixel-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                if (window.fbq) {
                  window.fbq('init', '2984009378374748');
                  window.fbq('track', 'PageView');
                } else {
                  // Fallback: try again after a short delay if fbq isn't ready
                  setTimeout(function() {
                    if (window.fbq) {
                      window.fbq('init', '2984009378374748');
                      window.fbq('track', 'PageView');
                    }
                  }, 500);
                }
              `,
            }}
          />
        </>
      )}
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
    </>
  );
}

export default MyApp;
