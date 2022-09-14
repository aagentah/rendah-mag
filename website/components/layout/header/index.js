import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import NProgress from 'nprogress';

import { useApp } from '../../../context-provider/app';
import { useUser } from '~/lib/hooks';

const HeaderDesktop = dynamic(() => import('./desktop'));
const HeaderMobile = dynamic(() => import('./mobile'));

export default function Header({ navOnWhite, meta }) {
  const app = useApp();
  const [user, { mutate }] = useUser();
  const [navColour, setNavColour] = useState('black');
  const [navHex, setNavHex] = useState(null);

  const IconStar = dynamic(() =>
    import('~/components/elements/icon').then(m => m.IconStar)
  );

  const IconStore = dynamic(() =>
    import('~/components/elements/icon').then(m => m.IconStore)
  );

  const IconSignIn = dynamic(() =>
    import('~/components/elements/icon').then(m => m.IconSignIn)
  );

  const IconSignOut = dynamic(() =>
    import('~/components/elements/icon').then(m => m.IconSignOut)
  );

  const buttonIcons = {
    signIn: <IconSignIn color={navColour} size={16} />,
    signOut: <IconSignOut color={navColour} size={16} />,
    store: <IconStar color="rendah-red" size={16} />,
    shoppingCart: <IconStore color={navColour} size={16} />
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
