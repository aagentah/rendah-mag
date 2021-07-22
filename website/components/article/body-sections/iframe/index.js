import Iframe from 'react-iframe';
import LazyLoad from 'react-lazyload';
import { useApp } from '~/context-provider/app';

export default function IframeBlock({ url, heightDesktop, heightMobile }) {
  const app = useApp();
  const frameHeight =
    heightMobile && app.deviceSize === 'md' ? heightMobile : heightDesktop;

  return (
    <LazyLoad once offset={150} height={frameHeight}>
      <div className="w-90  db  mla  mra">
        <Iframe
          url={url}
          width="100%"
          height={frameHeight}
          display="initial"
          position="relative"
        />
      </div>
    </LazyLoad>
  );
}
