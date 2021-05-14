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
          text="Offerings"
          color="black"
          size="medium"
          truncate={null}
          /* Children */
          withLinkProps={null}
        />
      </div>
      <div className="pb4  mb2">
        <p className="black  f6  lh-copy">
          Creations serves as our internal offering for additional exclusive
          content on the Dominion. The idea behind this is to share insights not
          only on music, but as a wider-appeal to the industry as a whole,
          including tutorials, technical interviews, branding tips, creative
          features, and much more!
        </p>
      </div>

      <div className="flex  flex-wrap">
        <section key={offering.slug} className="col-24  pb3">
          <div className="pb3">
            <Heading
              /* Options */
              htmlEntity="h1"
              text={offering.title}
              color="black"
              size="small"
              truncate={null}
              /* Children */
              withLinkProps={null}
            />
          </div>

          {offering.tracks.map((item, i) => (
            <div key={item.track.slug} className="col-24  ph4  pb3">
              <AudioEmbed
                i={i}
                title={item.track?.title}
                description={null}
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
