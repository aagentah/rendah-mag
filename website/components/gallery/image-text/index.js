import { Parallax } from 'react-scroll-parallax';
import LazyLoad from 'react-lazyload';
import { useState } from 'react';

import { Heading, Image, Button, Icon } from 'next-pattern-library';

import ImageModal from '~/components/gallery/image-modal';

import { useApp } from '~/context-provider/app';

export default function GalleryImageText({ align }) {
  const app = useApp();
  const [modalActive, setModalActive] = useState(false);
  const closeModal = () => setModalActive(false);

  const setWrap = () => {
    console.log('app.deviceSize', app.deviceSize);
    if (align === 'left' || app.deviceSize === 'md') {
      return '';
    }

    return 'flex-row-reverse';
  };

  return (
    <LazyLoad once offset={100} height={360}>
      <div className={`flex  flex-wrap  ${setWrap()}  pb7`}>
        <div className="col-24  col-12-md  ph4">
          <Parallax speed={0} disabled={app.deviceSize === 'md'}>
            <Image
              /* Options */
              src={
                'https://live.staticflickr.com/65535/50299213677_e0ff28d626_k.jpg'
              }
              placeholder={
                'https://live.staticflickr.com/65535/50299213677_e0ff28d626_k.jpg'
              }
              alt="This is the alt text."
              figcaption={null}
              height={null}
              width={null}
              customClass="cp  shadow3"
              skeleton={false}
              onClick={() => setModalActive(true)}
              /* Children */
              withLinkProps={null}
            />
          </Parallax>
        </div>

        <div className="col-24  col-12-md  ph5  pt6">
          <Parallax speed={-10} disabled={app.deviceSize === 'md'}>
            <h2 className="t-primary  mb4  tal">Lorem ipsum dolor sit amet</h2>
            <p className="tal">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </Parallax>
        </div>
      </div>

      <ImageModal modalActive={modalActive} closeModal={closeModal} />
    </LazyLoad>
  );
}
