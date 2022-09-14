import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';

import BlockContent from '@sanity/block-content-to-react';
import { usePlausible } from 'next-plausible';
import Button from '~/components/elements/button';
import Image from '~/components/elements/image';

import { useUser } from '~/lib/hooks';
import { useApp } from '~/context-provider/app';
import { imageBuilder } from '~/lib/sanity/requests';
import { useFirstRender } from '~/lib/useFirstRender';

const IconMusic = dynamic(() =>
  import('~/components/elements/icon').then(m => m.IconMusic)
);

export default function Audio({
  url,
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
  const app = useApp();
  const [user, { loading, mutate, error }] = useUser();
  const { currentAudioSelected, handleAudioPlay } = { ...props };

  if (useFirstRender() || !AudioPlayerHook || !RHAP_UIHook) {
    const action = async () => {
      const { default: AudioPlayer } = await import('react-h5-audio-player');
      const { RHAP_UI } = await import('react-h5-audio-player');

      console.log('AudioPlayer', { Hook: AudioPlayer });
      console.log('RHAP_UI', { Hook: RHAP_UI });

      setAudioPlayerHook({ Hook: AudioPlayer });
      setRHAP_UIHook({ Hook: RHAP_UI });
    };

    action();
    return false;
  }

  useEffect(() => {
    if (currentAudioSelected !== PlayerRef) {
      PlayerRef.current.audio.current.pause();
    }
  }, [currentAudioSelected]);

  const triggerOnPlayEvt = () => {
    plausible('Audio Play', {
      props: {
        action: 'play',
        label: title
      }
    });
  };

  const triggerOnDownloadEvt = () => {
    plausible('Audio Download', {
      props: {
        action: 'download',
        label: title
      }
    });
  };

  return (
    <div className="audio__wrapper">
      <div className="audio__icon">
        <IconMusic color="black" size={16} />;
      </div>

      {title ? (
        <p className="audio__title  db  t-body  lh-copy  f6  dark-grey  pb2  pr4  pr0-md  bold">
          {title}
        </p>
      ) : null}

      {description ? (
        <div className="pb2  rich-text">
          <BlockContent blocks={description} />
        </div>
      ) : null}

      <div className="flex  flex-wrap  pt2">
        <div className="flex  col-5  col-3-md  justify-center  align-center">
          {image ? (
            <Image
              /* Options */
              src={imageBuilder
                .image(image)
                .auto('format')
                .fit('clip')
                .url()}
              placeholder={null}
              alt="This is the alt text."
              figcaption={null}
              height={80}
              width={80}
              customClass="shadow2"
              skeleton={false}
              onClick={null}
              /* Children */
              withLinkProps={null}
            />
          ) : (
            <Image
              /* Options */
              src="https://cdn.sanity.io/images/q8z2vf2k/production/78e9b8033c9b75038ae1e5ef047110fd78b7372a-1080x816.png?rect=132,0,816,816&w=75&h=75&blur=20&fit=clip&auto=format"
              placeholder={null}
              alt="This is the alt text."
              figcaption={null}
              height={80}
              width={80}
              customClass="shadow2"
              skeleton={false}
              onClick={null}
              /* Children */
              withLinkProps={null}
            />
          )}
        </div>
        <div
          className={
            allowDownload
              ? 'col-19  col-17-md  pr0  pr2-md  flex  align-center  justify-center'
              : 'col-24'
          }
        >
          <AudioPlayerHook.Hook
            ref={PlayerRef}
            showSkipControls={false}
            showJumpControls={false}
            src={url}
            customProgressBarSection={[
              RHAP_UIHook.Hook.PROGRESS_BAR,
              RHAP_UIHook.Hook.CURRENT_TIME
            ]}
            layout="horizontal-reverse"
            onPlay={() => {
              if (handleAudioPlay) handleAudioPlay(PlayerRef);
              triggerOnPlayEvt();
            }}
          />
        </div>

        {allowDownload && (
          <div className="col-4  dn  df-md  justify-start  align-center  ph2">
            <a
              href={`${url}?dl=`}
              target="_external"
              className="cp  ph2"
              onClick={() => {
                triggerOnDownloadEvt();
              }}
            >
              <Button
                /* Options */
                type="primary"
                size="small"
                text="Download"
                color="black"
                fluid={false}
                icon={null}
                iconFloat={null}
                inverted={true}
                loading={false}
                disabled={false}
                skeleton={false}
                onClick={null}
                /* Children */
                withLinkProps={null}
              />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
