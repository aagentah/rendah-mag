import { useEffect, useState } from 'react';
import cx from 'classnames';
import NProgress from 'nprogress';

import { Icon } from 'next-pattern-library';

import HeaderDesktop from './desktop';
import HeaderMobile from './mobile';

import { useApp } from '../../../context-provider/app';
import { useUser } from '../../../lib/hooks';

export default function Header({ navOnWhite, meta }) {
  const app = useApp();
  const [user, { mutate }] = useUser();
  const [navColour, setNavColour] = useState('black');

  const logoWhite = cx({ 'o-0': navOnWhite });
  const logoBlack = cx({ 'o-0': !navOnWhite });

  const signIn = <Icon icon={['fas', 'sign-in-alt']} />;
  const signOut = <Icon icon={['fas', 'sign-out-alt']} />;
  const store = <Icon icon={['fas', 'store-alt']} />;
  const shoppingCart = (
    <Icon color={navColour} icon={['fas', 'shopping-cart']} />
  );

  const buttonIcons = {
    signIn,
    signOut,
    store,
    shoppingCart,
  };

  const handleLogout = async () => {
    await fetch('/api/logout');
    mutate({ user: null });
  };

  const showBasket = !!(
    meta.title === 'Store' ||
    meta.title === 'Product' ||
    meta.title === 'Dominion'
  );

  useEffect(() => {
    if (app.isLoading) {
      NProgress.start();
    } else {
      NProgress.done();
    }
  }, [app.isLoading]);

  useEffect(() => {
    if (navOnWhite) {
      setNavColour('black');
    } else {
      setNavColour('white');
    }
  }, [navOnWhite]);

  return (
    <>
      <HeaderDesktop
        meta={meta}
        navColour={navColour}
        logoWhite={logoWhite}
        logoBlack={logoBlack}
        handleLogout={handleLogout}
        showBasket={showBasket}
        buttonIcons={buttonIcons}
      />
      <HeaderMobile
        meta={meta}
        navColour={navColour}
        logoWhite={logoWhite}
        logoBlack={logoBlack}
        handleLogout={handleLogout}
        showBasket={showBasket}
        buttonIcons={buttonIcons}
      />
    </>
  );
}
