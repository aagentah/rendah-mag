import { useMediaQuery } from 'react-responsive';

import { useDispatchApp } from '~/context-provider/app';
import { useApp } from '~/context-provider/app';

export default function deviceType() {
  const app = useApp();
  const dispatch = useDispatchApp();

  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-device-width: 950px)',
  });
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 950px)' });

  let deviceType = null;
  if (isDesktopOrLaptop) deviceType = 'desktop';
  if (isTabletOrMobile) deviceType = 'mobile';

  if (app.deviceType !== deviceType) {
    dispatch({ type: 'SET_DEVICE_TYPE', deviceType });
  }
}
