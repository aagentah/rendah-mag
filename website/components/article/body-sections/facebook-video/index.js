import React, { useState } from 'react';

// import { FacebookProvider, EmbeddedVideo } from 'react-facebook';
import LazyLoad from 'react-lazyload';

import { useApp } from '~/context-provider/app';
import { useFirstRender } from '~/lib/useFirstRender';

export default function FacebookVideo({ url }) {
  const app = useApp();
  const [FacebookProviderHook, setFacebookProviderHook] = useState(false);
  const [EmbeddedVideoHook, setEmbeddedVideoHook] = useState(false);

  if (useFirstRender() || !FacebookProviderHook || !EmbeddedVideoHook) {
    const action = async () => {
      const { FacebookProvider, EmbeddedVideo } = await import(
        'react-facebook'
      );
      setFacebookProviderHook({ Hook: FacebookProvider });
      setEmbeddedVideoHook({ Hook: EmbeddedVideo });
    };

    action();
    return false;
  }

  return (
    <div className="tac  db  w-90  mla  mra">
      <LazyLoad once offset={250} height={app.deviceSize === 'md' ? 266 : 490}>
        <FacebookProviderHook.Hook appId="154881868603516">
          <EmbeddedVideoHook.Hook href={url} />
        </FacebookProviderHook.Hook>
      </LazyLoad>
    </div>
  );
}
