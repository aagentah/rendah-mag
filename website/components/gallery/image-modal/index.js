import { useState, useEffect } from 'react';
import { Parallax } from 'react-scroll-parallax';
import LazyLoad from 'react-lazyload';

import { Copy, Heading, Image, Button, Icon } from 'next-pattern-library';

import Modal from '~/components/modal';

import { useApp } from '~/context-provider/app';

export default function ImageModal({ modalActive, closeModal }) {
  const app = useApp();

  console.log('modalActive', modalActive);

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
            text="Download"
            color="black"
            size="medium"
            truncate={0}
            onClick={null}
            /* Children */
            withLinkProps={null}
          />
        </div>
        <div className="pb3">
          <div className="flex  align-end  t-secondary  tal  f6  pb2">
            <a className="flex  align-center  db  underline  pr2" href="">
              <Icon
                className="light-grey  pr2"
                icon={['fa', 'download']}
                size="1x"
              />{' '}
              Default Size
            </a>
          </div>

          <div className="flex  align-end  t-secondary  tal  f6  pb2">
            <a className="flex  align-center  db  underline  pr2" href="">
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
        </div>

        <div className="flex  flex-wrap  pb2">
          <div className="col-24  flex  align-center">
            <Button
              /* Options */
              type="secondary"
              size="medium"
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
