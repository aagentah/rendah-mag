import { Parallax } from 'react-scroll-parallax';
import LazyLoad from 'react-lazyload';
import { useState } from 'react';

import { Heading, Image, Button, Icon } from 'next-pattern-library';

import ImageModal from '~/components/gallery/image-modal';

import { imageBuilder } from '~/lib/sanity/requests';
import { useApp } from '~/context-provider/app';

export default function GalleryBanner({ component }) {
  const app = useApp();
  const [modalActive, setModalActive] = useState(false);
  const closeModal = () => setModalActive(false);

  const scale = app?.isRetina ? 2 : 1;
  let imageUrlWidth;
  if (app.deviceSize === 'md') imageUrlWidth = 700;
  if (app.deviceSize === 'lg') imageUrlWidth = 1600;
  if (app.deviceSize === 'xl') imageUrlWidth = 1800;

  return (
    <LazyLoad once offset={100} height={360}>
      <div className="flex  flex-wrap  mb6  pb6  pt6">
        <div className="col-24">
          <Parallax speed={-10} disabled={app.deviceSize === 'md'}>
            <Image
              /* Options */
              src={
                component?.image?.asset &&
                imageBuilder
                  .image(component.image.asset)
                  .width(imageUrlWidth * scale)
                  .auto('format')
                  .fit('clip')
                  .url()
              }
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

      <ImageModal modalActive={modalActive} closeModal={closeModal} />
    </LazyLoad>
  );
}
