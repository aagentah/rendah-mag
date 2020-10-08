import Iframe from 'react-iframe';
import LazyLoad from 'react-lazyload';

export default function Soundcloud({ url }) {
  return (
    <LazyLoad once offset={150} height={166}>
      <div className="w-90  db  mla  mra">
        <Iframe
          url={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/${url}&color=%23777777&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=false&visual=false`}
          width="100%"
          height="166"
          display="initial"
          position="relative"
        />
      </div>
    </LazyLoad>
  );
}
