import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import BlockContent from '@sanity/block-content-to-react';
import { usePlausible } from 'next-plausible';
import Image from '~/components/elements/image';
import { imageBuilder } from '~/lib/sanity/requests';
import { useFirstRender } from '~/lib/useFirstRender';

const IconMusic = dynamic(() =>
  import('~/components/elements/icon').then((m) => m.IconMusic)
);

const IconDownload = dynamic(() =>
  import('~/components/elements/icon').then((m) => m.IconDownload)
);

export default function Audio({
  url, // Directly passing the resolved URL
  title,
  image,
  description,
  allowDownload,
  ...props
}) {
  const [AudioPlayerHook, setAudioPlayerHook] = useState(false);
  const [RHAP_UIHook, setRHAP_UIHook] = useState(false);
  const plausible = usePlausible();
  const PlayerRef = useRef(null);
  const { currentAudioSelected, handleAudioPlay } = { ...props };

  if (useFirstRender() || !AudioPlayerHook || !RHAP_UIHook) {
    const action = async () => {
      const { default: AudioPlayer } = await import('react-h5-audio-player');
      const { RHAP_UI } = await import('react-h5-audio-player');

      setAudioPlayerHook({ Hook: AudioPlayer });
      setRHAP_UIHook({ Hook: RHAP_UI });
    };

    action();
    return false;
  }

  useEffect(() => {
    if (
      PlayerRef.current?.audio?.current &&
      currentAudioSelected !== PlayerRef
    ) {
      PlayerRef.current.audio.current.pause();
    }
  }, [currentAudioSelected]);

  const triggerOnPlayEvt = () => {
    plausible('Audio Play', {
      props: {
        action: 'play',
        label: title,
      },
    });
  };

  const triggerOnDownloadEvt = () => {
    plausible('Audio Download', {
      props: {
        action: 'download',
        label: title,
      },
    });
  };

  console.log('props', props);

  if (!url) return null; // Optionally render nothing until the URL is resolved

  return (
    <div className="flex flex-wrap">
      {title && (
        <div className="col-24 audio__title tac o-50">
          <p className="db t-primary lh-copy f6">{title}</p>
        </div>
      )}

      {url && (
        <AudioPlayerHook.Hook
          ref={PlayerRef}
          showSkipControls={false}
          showJumpControls={false}
          src={url}
          customProgressBarSection={[
            RHAP_UIHook.Hook.PROGRESS_BAR,
            RHAP_UIHook.Hook.CURRENT_TIME,
          ]}
          layout="horizontal-reverse"
          onPlay={() => {
            if (handleAudioPlay) handleAudioPlay(PlayerRef);
            triggerOnPlayEvt();
          }}
        />
      )}
    </div>
  );
}
