import SpotifyPlayer from 'react-spotify-player';

export default function Spotify({ uri }) {
  const size = {
    width: '100%',
    height: 80,
  };
  const view = 'list'; // or 'coverart'
  const theme = 'black'; // or 'white'

  return (
    <div className="flex  justify-center  ph4">
      <div className="bg-dark-grey  pa2  w-100">
        <SpotifyPlayer uri={uri} size={size} view={view} theme={theme} />
      </div>
    </div>
  );
}
