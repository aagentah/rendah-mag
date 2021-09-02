import { useState, useEffect } from 'react';
import { Heading, Copy, Image, Button, Icon } from 'next-pattern-library';
import BlockContent from '@sanity/block-content-to-react';

import { useApp } from '~/context-provider/app';

import { imageBuilder } from '~/lib/sanity/requests';

export default function CarouselItemSection({ pack }) {
  const app = useApp();
  const scale = app?.isRetina ? 2 : 1;

  const [currentAudioSelected, setCurrentAudioSelected] = useState(false);
  const handleAudioPlay = (playerRef) => setCurrentAudioSelected(playerRef);
  const imageUrlWidth = app?.deviceSize === 'md' ? 260 : 400;
  const imageHeight = app?.deviceSize === 'md' ? 260 : 400;

  return (
    <section>
      <div className="pb2">
        <Heading
          /* Options */
          htmlEntity="h1"
          text={pack.title}
          color="black"
          size="medium"
          truncate={null}
          /* Children */
          withLinkProps={null}
        />
      </div>

      <div className="pb3  rich-text">
        <BlockContent blocks={pack.description} />
      </div>

      <div className="flex  pb4">
        <Image
          /* Options */
          src={
            pack &&
            imageBuilder
              .image(pack.image)
              .width(imageUrlWidth * scale)
              .height(imageHeight * scale)
              .auto('format')
              .fit('clip')
              .url()
          }
          placeholder={null}
          alt={pack?.title}
          figcaption={null}
          height={imageHeight}
          width={null}
          customClass={null}
          skeleton={false}
          onClick={null}
          /* Children */
          withLinkProps={null}
        />
      </div>

      <Button
        /* Options */
        type="primary"
        size="medium"
        text="Download"
        color="black"
        fluid={false}
        icon={null}
        iconFloat={null}
        inverted={false}
        loading={false}
        disabled={false}
        skeleton={false}
        onClick={null}
        /* Children */
        withLinkProps={{
          type: 'external',
          href: `${pack.folder}?dl=`,
          target: null,
          routerLink: null,
          routerLinkProps: null,
        }}
      />
    </section>
  );
}
