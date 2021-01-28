import { useMediaQuery } from 'react-responsive';

import { useDispatchApp, useApp } from '~/context-provider/app';

export default function deviceSize() {
  const app = useApp();
  const dispatch = useDispatchApp();

  // Big screen
  const isBigScreen = useMediaQuery({ query: '(min-width: 1550px)' });
  // Desktop
  const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 1250px)' });
  // Mobile
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 950px)' });

  const getDeviceSize = () => {
    if (isBigScreen) return 'xl';
    if (isDesktopOrLaptop) return 'lg';
    if (isTabletOrMobile) return 'md';
  };

  const deviceSize = getDeviceSize();
  const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' });

  if (!deviceSize) return;
  if (app.deviceSize !== deviceSize) {
    dispatch({ type: 'SET_DEVICE', deviceSize, isRetina });
  }
}
