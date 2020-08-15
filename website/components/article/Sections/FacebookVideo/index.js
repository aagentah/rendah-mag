import FacebookProvider, { EmbeddedVideo } from 'react-facebook';

export default function FacebookVideo() {
  return (
    <div className="center  tac  db  w-90  center">
      <FacebookProvider appId="154881868603516">
        <EmbeddedVideo href={this.props.url} />
      </FacebookProvider>
    </div>
  );
}
