import { useMediaQuery } from 'react-responsive';

import { useDispatchApp } from '~/context-provider/app';
import { useApp } from '~/context-provider/app';

export default function deviceType() {
  const app = useApp();
  const dispatch = useDispatchApp();

  const isBigScreen = useMediaQuery({
    query: '(min-width: 1550px)',
  });

  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1250px)',
  });

  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 950px)' });

  const getDeviceType = () => {
    if (isBigScreen) return 'big-screen';
    if (isDesktopOrLaptop) return 'desktop';
    if (isTabletOrMobile) return 'mobile';
  };

  const deviceType = getDeviceType();

  if (!deviceType) return;
  if (app.deviceType !== deviceType) {
    dispatch({ type: 'SET_DEVICE_TYPE', deviceType });
  }
}
