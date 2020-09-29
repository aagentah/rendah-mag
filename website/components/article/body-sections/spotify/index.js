import SpotifyPlayer from 'react-spotify-player';
import LazyLoad from 'react-lazyload';

export default function Spotify({ uri }) {
  const size = {
    width: '100%',
    height: 80,
  };
  const view = 'list'; // or 'coverart'
  const theme = 'black'; // or 'white'

  return (
    <div className="flex  justify-center  ph4-md">
      <div className="bg-dark-grey  pa2  w-100">
        <LazyLoad once offset={150} height={100}>
          <SpotifyPlayer uri={uri} size={size} view={view} theme={theme} />
        </LazyLoad>
      </div>
    </div>
  );
}
