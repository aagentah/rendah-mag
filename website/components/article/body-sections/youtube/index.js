import YouTube from 'react-youtube';
import LazyLoad from 'react-lazyload';

export default function Youtube({ videoId }) {
  return (
    <>
      <LazyLoad once offset={300} height={360}>
        <div className="flex  flex-wrap  ph4  pb4">
          <div className="col-6"></div>
          <div className="col-24  col-12-md  flex  justify-center">
            <YouTube className="db  mla  mra  w-90" videoId={videoId} />
          </div>

          <div className="col-6"></div>
        </div>
      </LazyLoad>
    </>
  );
}
