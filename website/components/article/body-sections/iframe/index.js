import Iframe from 'react-iframe';
import LazyLoad from 'react-lazyload';
import Script from 'next/script';
import { useApp } from '~/context-provider/app';

export default function IframeBlock({ url, heightDesktop, heightMobile }) {
  const app = useApp();
  const frameHeight =
    heightMobile && app.deviceSize === 'md' ? heightMobile : heightDesktop;

  if (url.includes('vimeo')) {
    return (
      <>
        <div style={{ padding: '56.25% 0 0 0', position: 'relative' }}>
          <iframe
            src={url}
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%'
            }}
            title={url}
          />
        </div>

        <Script src="https://player.vimeo.com/api/player.js" />
      </>
    );
  }

  return (
    <LazyLoad once offset={250} height={frameHeight}>
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
