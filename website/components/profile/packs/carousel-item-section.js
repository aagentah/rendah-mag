import { useState } from 'react';
import { Heading, Image, Button } from 'next-pattern-library';
import BlockContent from '@sanity/block-content-to-react';

import { useApp } from '~/context-provider/app';
import { SANITY_BLOCK_SERIALIZERS } from '~/constants';

import { imageBuilder } from '~/lib/sanity/requests';

export default function CarouselItemSection({ pack }) {
  const app = useApp();
  const scale = app?.isRetina ? 2 : 1;

  const [currentAudioSelected, setCurrentAudioSelected] = useState(false);
  const handleAudioPlay = (playerRef) => setCurrentAudioSelected(playerRef);
  const imageUrlWidth = app?.deviceSize === 'md' ? 260 : 400;
  const imageUrlHeight = app?.deviceSize === 'md' ? 260 : 400;

  return (
    <section>
      <div className="flex  flex-wrap">
        <div className="col-24  col-12-md  ph3  pr4-md  ph0-md">
          <div className="col-24">
            <Heading
              /* Options */
              htmlEntity="h1"
              text={pack.title}
              color="white"
              size="medium"
              truncate={null}
              /* Children */
              withLinkProps={null}
            />
          </div>

          <div className="col-24  pb3  rich-text">
            <BlockContent
              blocks={pack.description}
              serializers={SANITY_BLOCK_SERIALIZERS}
            />
          </div>

          <div className="col-24  pb4  pb0-md">
            <Button
              /* Options */
              type="primary"
              size={app?.deviceSize === 'md' ? 'small' : 'medium'}
              text="Download"
              color="white"
              fluid={false}
              icon={null}
              iconFloat={null}
              inverted={true}
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
        <div className="col-24  col-12-md  ph3">
          <Image
            /* Options */
            src={
              pack &&
              imageBuilder
                .image(pack.image)
                .width(imageUrlWidth * scale)
                .height(imageUrlHeight * scale)
                .auto('format')
                .fit('scale')
                .url()
            }
            placeholder={null}
            alt={pack?.title}
            figcaption={null}
            height={imageUrlHeight}
            width={imageUrlWidth}
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
