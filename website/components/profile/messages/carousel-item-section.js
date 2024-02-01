import BlockContent from '@sanity/block-content-to-react';
import Heading from '~/components/elements/heading';
import { SANITY_BLOCK_SERIALIZERS } from '~/constants';
import { imageBuilder } from '~/lib/sanity/requests';

function myPortableTextComponents() {
  return {
    types: {
      image: (value) => {
        console.log('value', value);
        if (!value?.node?.asset) {
          return null;
        }

        return (
          <img
            className="mw6  br4  shadow2  mb3  pv2"
            src={imageBuilder
              .image(value?.node?.asset)
              .height(2000)
              .width(2000)
              .auto('format')
              .fit('clip')
              .blur('20')
              .url()}
          />
        );
      },
    },
  };
}

export default function CarouselItemSection({ message }) {
  return (
    <section className="pv5  ph3  pa5-md  ba-md  bc-white  br4">
      <div className="pb2">
        <Heading
          /* Options */
          htmlEntity="h1"
          text={message.title}
          color="white"
          size="medium"
          truncate={null}
          /* Children */
          withLinkProps={null}
        />
      </div>

      <p className="white  pb4  f7">{message.activeFrom}</p>

      <div className="rich-text">
        <BlockContent
          blocks={message.description}
          serializers={{
            ...SANITY_BLOCK_SERIALIZERS,
            ...myPortableTextComponents(),
          }}
        />
      </div>
    </section>
  );
}
