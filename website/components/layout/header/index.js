import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import NProgress from 'nprogress';

import Icon from '~/components/elements/icon';
import { useApp } from '../../../context-provider/app';
import { useUser } from '~/lib/hooks';

const HeaderDesktop = dynamic(() => import('./desktop'));
const HeaderMobile = dynamic(() => import('./mobile'));

export default function Header({ navOnWhite, meta }) {
  const app = useApp();
  const [user, { mutate }] = useUser();
  const [navColour, setNavColour] = useState('black');
  const [navHex, setNavHex] = useState(null);

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
    shoppingCart
  };

  const handleLogout = async () => {
    await fetch(`${process.env.SITE_URL}/api/logout`);
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
      setNavHex('#000000');
    } else {
      setNavColour('white');
      setNavHex('#FFFFFF');
    }
  }, [navOnWhite]);

  if (app?.deviceSize && navHex) {
    return (
      <>
        {app.deviceSize !== 'md' && (
          <HeaderDesktop
            meta={meta}
            navColour={navColour}
            navHex={navHex}
            navOnWhite={navOnWhite}
            handleLogout={handleLogout}
            showBasket={showBasket}
            buttonIcons={buttonIcons}
          />
        )}
        {app.deviceSize === 'md' && (
          <HeaderMobile
            meta={meta}
            navColour={navColour}
            navHex={navHex}
            navOnWhite={navOnWhite}
            handleLogout={handleLogout}
            showBasket={showBasket}
            buttonIcons={buttonIcons}
          />
        )}
      </>
    );
  }

  return false;
}
