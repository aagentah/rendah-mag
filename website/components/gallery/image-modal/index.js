import { useState, useEffect } from 'react';
import { Parallax } from 'react-scroll-parallax';
import LazyLoad from 'react-lazyload';
import NProgress from 'nprogress';

import { Copy, Heading, Image, Button, Icon } from 'next-pattern-library';

import Modal from '~/components/modal';

import { useApp } from '~/context-provider/app';
import { imageBuilder } from '~/lib/sanity/requests';
import { useUser } from '~/lib/hooks';

export default function ImageModal({
  modalActive,
  closeModal,
  postTitle,
  component,
}) {
  const app = useApp();
  const [user] = useUser();

  const toDataURL = (url) => {
    return fetch(url)
      .then((response) => {
        return response.blob();
      })
      .then((blob) => {
        return URL.createObjectURL(blob);
      });
  };

  const download = async (url) => {
    const a = document.createElement('a');
    a.href = await toDataURL(url);
    a.download = postTitle;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  let src;

  if (component.image?.dominionExclusive) {
    src = imageBuilder
      .image(component.image.asset)
      .blur(250)
      .auto('format')
      .fit('clip')
      .url();
  } else {
    src = imageBuilder
      .image(component.image.asset)
      .auto('format')
      .fit('clip')
      .url();
  }

  useEffect(() => {
    NProgress.start();
    setTimeout(() => {
      NProgress.done();
    }, 100);
  }, []);

  return (
    <>
      <Modal
        /* Options */
        size="small"
        active={modalActive}
      >
        <div className="pb2  mb2">
          <Heading
            /* Options */
            htmlEntity="h3"
            text="Download image"
            color="black"
            size="medium"
            truncate={0}
            onClick={null}
            /* Children */
            withLinkProps={null}
          />
        </div>

        <div className="pb3">
          <Image
            /* Options */
            src={src}
            placeholder={imageBuilder
              .image(component.image.asset)
              .width(300 / 10)
              .auto('format')
              .fit('clip')
              .blur('20')
              .url()}
            alt="This is the alt text."
            figcaption={null}
            height={200}
            width={null}
            customClass="cp"
            skeleton={false}
            onClick={() => setModalActive(true)}
            /* Children */
            withLinkProps={null}
          />
        </div>

        <div className="pb3">
          {!component.image?.dominionExclusive && (
            <div className="flex  align-end  t-secondary  tal  f6  pb2">
              <span
                className="flex  align-center  db  underline  pr2  cp"
                onClick={() => {
                  download(
                    component?.image?.asset &&
                      imageBuilder
                        .image(component.image.asset)
                        .width(1080)
                        .auto('format')
                        .fit('clip')
                        .url()
                  );
                }}
              >
                <Icon
                  className="light-grey  pr2"
                  icon={['fa', 'download']}
                  size="1x"
                />{' '}
                Default Size
              </span>
            </div>
          )}

          {user?.isDominion ? (
            <div className="flex  align-end  t-secondary  tal  f6  pb2">
              <span
                className="flex  align-center  db  underline  pr2  cp"
                onClick={() => {
                  download(
                    component?.image?.asset &&
                      imageBuilder
                        .image(component.image.asset)
                        .width(1080)
                        .auto('format')
                        .fit('clip')
                        .url()
                  );
                }}
              >
                <Icon
                  className="light-grey  pr2"
                  icon={['fa', 'download']}
                  size="1x"
                />{' '}
                Original Size
              </span>
              <span className="f7  fs-italic">
                (Exclusive to Dominion Members)
              </span>
            </div>
          ) : (
            <div className="flex  align-end  t-secondary  tal  f6  pb2">
              <a
                className="flex  align-center  db  underline  pr2  cp"
                href="/login"
                target="_blank"
              >
                <Icon
                  className="light-grey  pr2"
                  icon={['fa', 'download']}
                  size="1x"
                />{' '}
                Original Size
              </a>
              <span className="f7  fs-italic">
                (Exclusive to Dominion Members)
              </span>
            </div>
          )}
        </div>

        <div className="flex  flex-wrap  pb2">
          <div className="col-24  flex  align-center">
            <Button
              /* Options */
              type="primary"
              size="small"
              text="Cancel"
              color="black"
              fluid={false}
              icon={null}
              iconFloat={null}
              inverted={false}
              loading={false}
              disabled={false}
              skeleton={false}
              onClick={closeModal}
              /* Children */
              withLinkProps={null}
            />
          </div>
        </div>
      </Modal>
    </>
  );
}