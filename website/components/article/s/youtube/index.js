import YouTube from 'react-youtube';

export default function Youtube({ videoId }) {
  return (
    <>
      <YouTube
        className="center  tac  db  w-90  center  h6"
        videoId={videoId}
      />
    </>
  );
}
