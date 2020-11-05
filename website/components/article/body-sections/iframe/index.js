import Iframe from 'react-iframe';
import LazyLoad from 'react-lazyload';

export default function IframeBlock({ url, height }) {
  return (
    <LazyLoad once offset={150} height={height}>
      <div className="w-90  db  mla  mra">
        <Iframe
          url={url}
          width="100%"
          height={height}
          display="initial"
          position="relative"
        />
      </div>
    </LazyLoad>
  );
}
