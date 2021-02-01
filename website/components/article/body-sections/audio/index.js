import { useState, useEffect, useRef } from 'react';
import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';
import { Button } from 'next-pattern-library';

import { useApp } from '~/context-provider/app';

export default function Audio({ url, allowDownload, ...props }) {
  const PlayerRef = useRef(null);
  const app = useApp();
  const { currentAudioSelected, handleAudioPlay } = { ...props };

  useEffect(() => {
    if (currentAudioSelected !== PlayerRef) {
      PlayerRef.current.audio.current.pause();
    }
  }, [currentAudioSelected]);

  return (
    <div className="tac  db  w-100  mla  mra">
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
            customAdditionalControls={[]}
            customProgressBarSection={[
              RHAP_UI.PROGRESS_BAR,
              RHAP_UI.CURRENT_TIME,
            ]}
            layout="horizontal-reverse"
            onPlay={() => {
              if (handleAudioPlay) handleAudioPlay(PlayerRef);
            }}
          />
        </div>

        {allowDownload && (
          <div className="col-4  dn  df-md  align-center  ph2">
            <a className="link" href={url}>
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
