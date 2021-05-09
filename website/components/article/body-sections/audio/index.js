import { useState, useEffect, useRef } from 'react';
import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';
import { Button, Icon } from 'next-pattern-library';
import BlockContent from '@sanity/block-content-to-react';

import { useUser } from '~/lib/hooks';
import { useApp } from '~/context-provider/app';
import * as gtag from '~/lib/gtag';

export default function Audio({
  url,
  title,
  description,
  allowDownload,
  ...props
}) {
  const PlayerRef = useRef(null);
  const app = useApp();
  const [user, { loading, mutate, error }] = useUser();
  const { currentAudioSelected, handleAudioPlay } = { ...props };
  console.log('props', props);

  useEffect(() => {
    if (currentAudioSelected !== PlayerRef) {
      PlayerRef.current.audio.current.pause();
    }
  }, [currentAudioSelected]);

  const triggerOnPlayEvt = () => {
    gtag.event({
      category: 'Audio',
      action: 'play',
      label: title,
    });
  };

  const triggerOnDownloadEvt = () => {
    gtag.event({
      category: 'Audio',
      action: 'download',
      label: title,
    });
  };

  return (
    <div className="audio__wrapper">
      <div className="audio__icon">
        <Icon icon={['fas', 'music']} />
      </div>

      {title ? (
        <p className="db  t-body  lh-copy  f6  dark-grey  pb2  pr4  pr0-md  bold">
          {title}
        </p>
      ) : null}

      {description ? <BlockContent blocks={description} /> : null}

      <div className="flex  flex-wrap">
        <div
          className={
            allowDownload ? 'col-24  col-20-md  pr0  pr2-md' : 'col-24'
          }
        >
          <AudioPlayer
            ref={PlayerRef}
            showSkipControls={false}
            showJumpControls={false}
            src={url}
            customProgressBarSection={[
              RHAP_UI.PROGRESS_BAR,
              RHAP_UI.CURRENT_TIME,
            ]}
            layout="horizontal-reverse"
            onPlay={() => {
              if (handleAudioPlay) handleAudioPlay(PlayerRef);
              triggerOnPlayEvt();
            }}
          />
        </div>

        {allowDownload && (
          <div className="col-4  dn  df-md  align-center  ph2">
            <Button
              /* Options */
              type="primary"
              size="small"
              text="Download"
              color="black"
              fluid={false}
              icon={null}
              iconFloat={null}
              inverted={false}
              loading={false}
              disabled={false}
              skeleton={false}
              onClick={() => {
                triggerOnDownloadEvt();
              }}
              /* Children */
              withLinkProps={{
                type: 'external',
                href: `${url}?dl=`,
                target: '_self',
                routerLink: null,
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
