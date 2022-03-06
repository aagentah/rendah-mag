import { Parallax } from 'react-scroll-parallax';
import LazyLoad from 'react-lazyload';
import { useState } from 'react';
import dynamic from 'next/dynamic';

import { Heading, Image, Button, Icon } from 'next-pattern-library';

import { imageBuilder } from '~/lib/sanity/requests';
import { useApp } from '~/context-provider/app';

const ImageModal = dynamic(() => import('~/components/gallery/image-modal'));

export default function GalleryBanner({ post, component }) {
  const app = useApp();
  const [modalActive, setModalActive] = useState(false);
  const closeModal = () => setModalActive(false);

  const scale = app?.isRetina ? 2 : 1;
  let imageUrlWidth;
  if (app.deviceSize === 'md') imageUrlWidth = 700;
  if (app.deviceSize === 'lg') imageUrlWidth = 1600;
  if (app.deviceSize === 'xl') imageUrlWidth = 1800;

  let src;

  if (component.image?.dominionExclusive) {
    src = imageBuilder
      .image(component.image.asset)
      .width(imageUrlWidth * scale)
      .blur(250)
      .auto('format')
      .fit('clip')
      .url();
  } else {
    src = imageBuilder
      .image(component.image.asset)
      .width(imageUrlWidth * scale)
      .auto('format')
      .fit('clip')
      .url();
  }

  return (
    <>
      <div className="flex  flex-wrap  mb0  mb6-md  pb6  pt0  pt6-md">
        <div className="col-24">
          <Parallax speed={-10} disabled={app.deviceSize === 'md'}>
            <Image
              /* Options */
              src={src}
              placeholder={imageBuilder
                .image(component.image.asset)
                .width(imageUrlWidth / 10)
                .auto('format')
                .fit('clip')
                .blur('20')
                .url()}
              alt="This is the alt text."
              figcaption={null}
              height={null}
              width={null}
              customClass="cp"
              skeleton={false}
              onClick={() => setModalActive(true)}
              /* Children */
              withLinkProps={null}
            />
          </Parallax>
        </div>
      </div>

      {modalActive && (
        <ImageModal
          modalActive={modalActive}
          closeModal={closeModal}
          postTitle={post.title}
          component={component}
        />
      )}
    </>
  );
}