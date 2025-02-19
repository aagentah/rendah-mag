import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';

import Alert from './alert';
import Footer from './footer';
import Meta from './meta';
import Header from './header';
// import CookieBanner from './cookie-banner';

import deviceSize from '~/lib/device-size';
import { useDarkMode } from '~/context-provider/dark-mode-context';

export default function Layout({
  title,
  navOffset,
  navOnWhite,
  hasNav,
  hasFooter,
  darkMode, // Receives darkMode from the page
  meta,
  preview,
  children,
}) {
  // Set device type in context API
  deviceSize();

  const { setDarkMode } = useDarkMode();

  // Apply dark mode based on the darkMode prop
  useEffect(() => {
    setDarkMode(!!darkMode);
  }, [darkMode, setDarkMode]);

  let navOffsetType;

  switch (navOffset) {
    case 'top':
      navOffsetType = 'pt5 pt6-md';
      break;
    case 'center':
      navOffsetType = 'flex align-center';
      break;
    default:
      navOffsetType = '';
      break;
  }

  const hideNav = typeof hasNav !== 'undefined' && !hasNav;
  const hideFooter = typeof hasFooter !== 'undefined' && !hasFooter;

  return (
    <div className="bg-neutral-800">
      <Meta {...meta} />
      <ToastContainer />
      {preview && <Alert preview={preview} />}
      {!preview && !hideNav && <Header navOnWhite={navOnWhite} meta={meta} />}
      <main className={`page page--${title}`}>
        {children}
        <div id="portal-root" />
      </main>
      {/* {!preview && title === 'login' && <CookieBanner />} */}
      {!hideFooter && <Footer />}
    </div>
  );
}
