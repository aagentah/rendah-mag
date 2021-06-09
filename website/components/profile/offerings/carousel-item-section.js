import { useState, useEffect } from 'react';
import {
  Modal,
  Hero,
  Heading,
  Copy,
  Image,
  Button,
  Icon,
  Label,
} from 'next-pattern-library';
import BlockContent from '@sanity/block-content-to-react';
import AudioEmbed from '~/components/article/body-sections/audio';

import Sections from '~/components/article/body-sections';

import { imageBuilder } from '~/lib/sanity/requests';

export default function CarouselItemSection({ offering }) {
  const [currentAudioSelected, setCurrentAudioSelected] = useState(false);
  const handleAudioPlay = (playerRef) => setCurrentAudioSelected(playerRef);

  return (
    <section>
      <div className="pb2">
        <Heading
          /* Options */
          htmlEntity="h1"
          text={offering.title}
          color="black"
          size="medium"
          truncate={null}
          /* Children */
          withLinkProps={null}
        />
      </div>
      <div className="pb4  mb2">
        <BlockContent blocks={offering.description} />
      </div>

      <div className="flex  flex-wrap  ph4">
        <section key={offering.slug} className="col-24  pb3">
          {offering.tracks.map((item, i) => (
            <div key={item.track.slug} className="col-24  pb4">
              <AudioEmbed
                i={i}
                title={item.track?.title}
                description={item.track?.description}
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
