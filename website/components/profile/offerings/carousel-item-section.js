import { useState } from 'react';

import BlockContent from '@sanity/block-content-to-react';
import Heading from '~/components/elements/heading';
import AudioEmbed from '~/components/article/body-sections/audio';

export default function CarouselItemSection({ offering }) {
  const [currentAudioSelected, setCurrentAudioSelected] = useState(false);
  const handleAudioPlay = (playerRef) => setCurrentAudioSelected(playerRef);

  const downloadAll = () => {
    for (let i = 0; i < offering.tracks.length; i++) {
      window.open(offering?.tracks[i]?.track?.file);
    }
  };

  return (
    <section className="pv5  ph3  pa5-md  ba-md  bc-white  br4">
      <div className="pb4">
        <Heading
          /* Options */
          htmlEntity="h1"
          text={offering.title}
          color="white"
          size="medium"
          truncate={null}
          /* Children */
          withLinkProps={null}
        />
      </div>

      <div className="pb3  mb4  rich-text  measure-wide">
        <BlockContent blocks={offering.description} />
      </div>

      <div className="flex  flex-wrap">
        <section key={offering.slug} className="col-24  pb3">
          {offering.tracks.map((item, i) => (
            <div key={item.track.slug} className="col-24  pb3">
              <AudioEmbed
                i={i}
                title={item.track?.title}
                description={item.track?.description}
                image={item.track?.image}
                url={item.track?.file}
                allowDownload={item.track?.allowDownload}
                handleAudioPlay={handleAudioPlay}
                currentAudioSelected={currentAudioSelected}
              />
            </div>
          ))}
        </section>
      </div>
    </section>
  );
}
