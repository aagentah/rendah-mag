import { FacebookProvider, EmbeddedVideo } from 'react-facebook';

export default function FacebookVideo({ url }) {
  console.log('url', url);
  return (
    <div className="tac  db  w-90  mla  mra">
      {
        <FacebookProvider appId="154881868603516">
          <EmbeddedVideo href={url} />
        </FacebookProvider>
      }
    </div>
  );
}
