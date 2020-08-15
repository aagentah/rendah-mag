import YouTube from 'react-youtube';

export default function Youtube({ videoId }) {
  return (
    <React.Fragment>
      <YouTube
        className="center  tac  db  w-90  center  h6"
        videoId={videoId}
      />
    </React.Fragment>
  );
}
