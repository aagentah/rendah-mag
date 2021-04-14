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

import Sections from '~/components/article/body-sections';

import { imageBuilder } from '~/lib/sanity/requests';

export default function CarouselItemSection({ item }) {
  const [currentAudioSelected, setCurrentAudioSelected] = useState(false);
  const handleAudioPlay = (playerRef) => setCurrentAudioSelected(playerRef);

  return (
    <div className="flex  flex-wrap  pb2">
      <div className="col-24">
        <div className="relative  ph2  ph4-md  pt4  pb2">
          <p className="t-secondary  f7  grey  pb2">
            {new Date(item.activeFrom).toDateString()}
          </p>

          <p className="t-primary  f5  f4-md  black  pb3  mb2">{item.title}</p>

          {item?.body && (
            <div className="rich-text  pb2">
              <Sections
                test="123"
                handleAudioPlay={handleAudioPlay}
                currentAudioSelected={currentAudioSelected}
                body={item.body}
              />
            </div>
          )}

          {item?.buttons && (
            <div className="flex  flex-wrap">
              {item.buttons.map((button) => (
                <div key={button.title} className="mr2  mb3">
                  <Button
                    /* Options */
                    type="primary"
                    size="small"
                    text={button.title}
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
                      href: button.link,
                      target: '_blank',
                      routerLink: Link,
                      routerLinkProps: {
                        scroll: false,
                      },
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {item.image && (
        <div className="w-100  mla  mra  ph4  ph5-md">
          <Image
            /* Options */
            src={imageBuilder
              .image(item.image)
              .width(800)
              .auto('format')
              .fit('clip')
              .url()}
            placeholder={imageBuilder
              .image(item.image)
              .width(800 / 10)
              .auto('format')
              .fit('clip')
              .blur('20')
              .url()}
            alt={item.title}
            figcaption={null}
            height={null}
            width={null}
            customClass={'br4'}
            skeleton={false}
            onClick={null}
            /* Children */
            withLinkProps={null}
          />
        </div>
      )}
    </div>
  );
}
