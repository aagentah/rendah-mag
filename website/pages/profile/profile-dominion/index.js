import { useState, useEffect } from 'react';
import Router from 'next/router';
import { useToasts } from 'react-toast-notifications';
import BlockContent from '@sanity/block-content-to-react';

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

import { imageBuilder } from '../../../lib/sanity/requests';

export default function ProfileDominion({ dominionItems }) {
  const [modalActive, setModalActive] = useState(false);

  console.log('dominionItems', dominionItems);

  const buttonIcon = <Icon icon={['fas', 'arrow-right']} />;

  if (dominionItems?.length) {
    return (
      <section>
        <div className="pb4">
          <Heading
            /* Options */
            htmlEntity="h1"
            text="Your Dominion."
            color="black"
            size="medium"
            truncate={null}
            reveal={null}
            /* Children */
            withLinkProps={null}
          />
        </div>

        <div className="flex  flex-wrap">
          {dominionItems.map((item, i) => (
            <>
              <Modal
                /* Options */
                size="large"
                active={modalActive}
              >
                <Heading
                  /* Options */
                  htmlEntity="h3"
                  text={item.title}
                  color="black"
                  size={item.image ? 'large' : 'medium'}
                  truncate={0}
                  onClick={null}
                  /* Children */
                  withLinkProps={null}
                />
                <div className="flex  flex-wrap">
                  <div
                    className={`col-24  ${item.image && 'col-12-md'}  pr4-md`}
                  >
                    <div className="pb2">
                      <div className="post__body">
                        <BlockContent blocks={item.mainDescription} />
                      </div>
                    </div>
                  </div>
                  <div className="col-24  col-12-md">
                    {item.image && (
                      <div className="pb4  pb0-md">
                        <div className="shadow2">
                          <Image
                            /* Options */
                            src={imageBuilder
                              .image(item.image)
                              .height(500)
                              .width(500)
                              .url()}
                            placeholder={imageBuilder
                              .image(item.image)
                              .height(50)
                              .width(50)
                              .url()}
                            alt=""
                            figcaption={null}
                            height={300}
                            onClick={null}
                            /* Children */
                            withLinkProps={null}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex  flex-wrap  pb2">
                  <div className="col-24 flex  justify-center  justify-start-md  align-center">
                    <Button
                      /* Options */
                      type="primary"
                      size="medium"
                      text="Close"
                      color="black"
                      fluid={false}
                      icon={null}
                      iconFloat={null}
                      inverted={false}
                      loading={false}
                      disabled={false}
                      onClick={() => setModalActive(!modalActive)}
                      /* Children */
                      withLinkProps={null}
                    />
                  </div>
                </div>
              </Modal>

              <div className="col-24  col-12-md">
                <div className="br3  pa3  shadow2">
                  <p className="t-secondary  f7  grey  pb2">
                    {new Date(item.activeFrom).toDateString()}
                  </p>

                  <p className="t-primary  f4  black  pb3  mb2">{item.title}</p>

                  <div className="flex  flex-wrap  pb3">
                    {item?.tags &&
                      item.tags.map((tag, i) => (
                        <div key={tag} className="mr2  mb3">
                          <Label
                            /* Options */
                            customClass={'ph2'}
                            text={tag}
                            color={'white'}
                            backgroundColor={'black'}
                            onClick={null}
                            /* Children */
                            withLinkProps={null}
                          />
                        </div>
                      ))}
                  </div>

                  <div className="pb2">
                    <Button
                      /* Options */
                      type="secondary"
                      size="small"
                      text="More details"
                      color="black"
                      fluid={false}
                      icon={buttonIcon}
                      iconFloat={null}
                      inverted={false}
                      loading={false}
                      disabled={false}
                      onClick={() => setModalActive(!modalActive)}
                      /* Children */
                      withLinkProps={null}
                    />
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="pb4">
        <Heading
          /* Options */
          htmlEntity="h1"
          text="You are not in the Dominion."
          color="black"
          size="medium"
          truncate={null}
          reveal={null}
          /* Children */
          withLinkProps={null}
        />
      </div>
    </section>
  );
}
