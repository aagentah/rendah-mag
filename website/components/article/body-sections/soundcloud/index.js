import Iframe from 'react-iframe';
import LazyLoad from 'react-lazyload';

export default function Soundcloud({ url }) {
  return (
    <LazyLoad once offset={250} height={166}>
      <div className="flex  flex-wrap  ph4  pb3">
        <div className="col-6"></div>
        <div className="col-24  col-12-md  flex  justify-center">
          <div className="w-90  db  mla  mra  o-80">
            <Iframe
              url={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/${url}&color=%23000000&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=false&visual=false`}
              width="100%"
              height="166"
              display="initial"
              position="relative"
            />
          </div>
        </div>
        <div className="col-6"></div>
      </div>
    </LazyLoad>
  );
}
