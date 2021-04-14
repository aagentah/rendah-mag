import YouTube from 'react-youtube';
import LazyLoad from 'react-lazyload';

export default function Youtube({ videoId }) {
  return (
    <>
      <LazyLoad once offset={300} height={360}>
        <YouTube className="db  mla  mra  w-90" videoId={videoId} />
      </LazyLoad>
    </>
  );
}
