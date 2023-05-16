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
    <div className="flex  flex-wrap  ph4  pb4">
      <div className="col-6"></div>
      <div className="col-24  col-12-md  flex  justify-center">
        <div className="flex  justify-center  ph4-md">
          <div className="bg-dark-grey  pa2  w-100">
            <LazyLoad once offset={250} height={100}>
              <SpotifyPlayer uri={uri} size={size} view={view} theme={theme} />
            </LazyLoad>
          </div>
        </div>
      </div>
      <div className="col-6"></div>
    </div>
  );
}
