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

  return (
    <section>
      <div className="flex  flex-wrap">
        <div className="col-24  col-14-md  ph3  pr3-md  ph0-md">
          <div className="col-24">
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

          <div className="col-24  pb3  rich-text">
            <BlockContent blocks={pack.description} />
          </div>

          <div className="col-24  pb4  pb0-md">
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
          </div>
        </div>
        <div className="col-24  col-10-md  ph3">
          <Image
            /* Options */
            src={
              pack &&
              imageBuilder
                .image(pack.image)
                .width(imageUrlWidth * scale)
                .auto('format')
                .fit('scale')
                .url()
            }
            placeholder={null}
            alt={pack?.title}
            figcaption={null}
            height={null}
            width={null}
            customClass="br4  shadow2"
            skeleton={false}
            onClick={null}
            /* Children */
            withLinkProps={null}
          />
        </div>
      </div>
    </section>
  );
}
