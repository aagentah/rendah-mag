import { Parallax } from 'react-scroll-parallax';
import LazyLoad from 'react-lazyload';
import { useState } from 'react';

import { Heading, Image, Button, Icon } from 'next-pattern-library';

import ImageModal from '~/components/gallery/image-modal';

import { useApp } from '~/context-provider/app';

export default function GalleryBanner({}) {
  const app = useApp();
  const [modalActive, setModalActive] = useState(false);
  const closeModal = () => setModalActive(false);

  return (
    <LazyLoad once offset={100} height={360}>
      <div className="flex  flex-wrap  mb6  pb6  pt6">
        <div className="col-24">
          <Parallax speed={-10} disabled={app.deviceSize === 'md'}>
            <Image
              /* Options */
              src={
                'https://live.staticflickr.com/65535/49648737658_83f24c0399_k.jpg'
              }
              placeholder={
                'https://live.staticflickr.com/65535/49648737658_83f24c0399_k.jpg'
              }
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
