import YouTube from 'react-youtube';
import LazyLoad from 'react-lazyload';

export default function Youtube({ videoId }) {
  return (
    <>
      <LazyLoad once offset={150} height={360}>
        <YouTube
          className="center  tac  db  w-90  center  h6"
          videoId={videoId}
        />
      </LazyLoad>
    </>
  );
}
