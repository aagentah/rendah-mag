import { Parallax } from 'react-scroll-parallax';
import LazyLoad from 'react-lazyload';
import { useState } from 'react';
import BlockContent from '@sanity/block-content-to-react';
import dynamic from 'next/dynamic';

import Image from '~/components/elements/image';
import { imageBuilder } from '~/lib/sanity/requests';
import { useApp } from '~/context-provider/app';
import { SANITY_BLOCK_SERIALIZERS } from '~/constants';
import { useUser } from '~/lib/hooks';

const ImageModal = dynamic(() => import('~/components/gallery/image-modal'));

export default function GalleryImageText({ post, component }) {
  const [user, { loading, mutate, error }] = useUser();
  const app = useApp();
  const [modalActive, setModalActive] = useState(false);
  const closeModal = () => setModalActive(false);

  const scale = app?.isRetina ? 2 : 1;
  const imageUrlWidth = app?.deviceSize === 'md' ? 260 : 500;

  const setWrap = () => {
    if (component.align === 'left' || app.deviceSize === 'md') {
      return '';
    }

    return 'flex-row-reverse';
  };

  const setTextAlign = () => {
    if (component.align === 'left' || app.deviceSize === 'md') {
      return 'tal';
    }

    return 'tar';
  };

  let src;

  if (component.image?.dominionExclusive && !user?.isDominion) {
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

  if (app?.deviceSize) {
    return (
      <LazyLoad once offset={250}>
        <div className={`flex  flex-wrap  ${setWrap()}  pb5`}>
          <div className="col-24  col-12-md  ph4">
            <Parallax speed={20} disabled={app.deviceSize === 'md'}>
              <div className="relative">
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
                  customClass="cp  shadow3"
                  skeleton={false}
                  onClick={() => setModalActive(true)}
                  /* Children */
                  withLinkProps={null}
                />

                {component.image?.dominionExclusive && (
                  <div className="absolute  pa2  w4  bottom  left  right  mla  mra  nb3  bg-light-grey  br4  shadow2">
                    <img
                      /* Options */
                      src="https://res.cloudinary.com/dzz8ji5lj/image/upload/v1617575443/dominion/dominion-logo-transparent.png"
                      alt="Dominion"
                    />
                  </div>
                )}
              </div>
            </Parallax>
          </div>

          <div className="col-24  col-12-md  ph5  pt5  pt6-md">
            <div className={`measure-wide  mla  mra  ${setTextAlign()}`}>
              <BlockContent
                blocks={component.text}
                serializers={SANITY_BLOCK_SERIALIZERS}
              />
            </div>
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
      </LazyLoad>
    );
  }
}
