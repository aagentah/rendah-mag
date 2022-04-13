import { useEffect, useRef } from 'react';
import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';
import { Icon, Image } from 'next-pattern-library';
import BlockContent from '@sanity/block-content-to-react';
import { usePlausible } from 'next-plausible';

import { useUser } from '~/lib/hooks';
import { useApp } from '~/context-provider/app';
import { imageBuilder } from '~/lib/sanity/requests';

export default function Audio({
  url,
  title,
  image,
  description,
  allowDownload,
  ...props
}) {
  const plausible = usePlausible();
  const PlayerRef = useRef(null);
  const app = useApp();
  const [user, { loading, mutate, error }] = useUser();
  const { currentAudioSelected, handleAudioPlay } = { ...props };

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
        <Icon icon={['fas', 'music']} />
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
        <div className="flex  col-4  col-2-md  align-center">
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
              height={50}
              width={50}
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
              height={50}
              width={50}
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
            allowDownload ? 'col-20  col-18-md  pr0  pr2-md' : 'col-24'
          }
        >
          <AudioPlayer
            ref={PlayerRef}
            showSkipControls={false}
            showJumpControls={false}
            src={url}
            customProgressBarSection={[
              RHAP_UI.PROGRESS_BAR,
              RHAP_UI.CURRENT_TIME
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
              <Icon color="white" icon={['fa', 'download']} />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
