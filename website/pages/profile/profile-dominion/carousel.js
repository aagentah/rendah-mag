import { useState, useEffect } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import BlockContent from '@sanity/block-content-to-react';
import { useKeenSlider } from 'keen-slider/react';

import {
  Hero,
  Heading,
  Copy,
  Image,
  Button,
  Icon,
  Label,
  Modal,
} from 'next-pattern-library';

import { useApp } from '~/context-provider/app';
import { useUser } from '~/lib/hooks';
import setCharAt from '~/functions/setCharAt';

import { imageBuilder } from '~/lib/sanity/requests';

const buttonIconArrowRight = <Icon icon={['fas', 'arrow-right']} />;

export default function Carousel({ dominionItems, refreshDominion }) {
  const app = useApp();
  const [user, { loading, mutate, error }] = useUser();
  const [currentNavSlide, setCurrentNavSlide] = useState(0);
  const [modalActive, setModalActive] = useState(false);

  const sliderNavOptions = {
    slidesPerView: app.deviceSize === 'md' ? 1 : 3,
    mode: 'snap',
    centered: app.deviceSize === 'md',
    spacing: 0,
    controls: false,
    initial: 0,
  };

  const [sliderNavRef, sliderNav] = useKeenSlider(sliderNavOptions);

  const ArrowLeft = (props) => {
    return (
      <div
        onClick={props.onClick}
        className={`carousel-arrow--left  pa2 ${
          props.disabled ? 'light-grey' : 'black  cp'
        }`}
      >
        <Icon
          icon={['fas', 'chevron-left']}
          size={app.deviceSize === 'md' ? '3x' : '2x'}
        />
      </div>
    );
  };

  const ArrowRight = (props) => {
    return (
      <div
        onClick={props.onClick}
        className={`carousel-arrow--right  pa2 ${
          props.disabled ? 'light-grey' : 'black  cp'
        }`}
      >
        <Icon
          icon={['fas', 'chevron-right']}
          size={app.deviceSize === 'md' ? '3x' : '2x'}
        />
      </div>
    );
  };

  if (refreshDominion && dominionItems.length) {
    return (
      <>
        <div className="navigation-wrapper  mb3-md">
          <div
            ref={sliderNavRef}
            className="keen-slider  flex  align-center  pb4"
          >
            {dominionItems.map((item, i) => (
              <>
                <article
                  className="www  keen-slider__slide  relative  pt3  ph3  pb4"
                  key={item._id}
                >
                  <div className="relative  profile__dominion__carousel-item__wrapper">
                    <div
                      className={`profile__dominion__carousel-item  mla  mra  flex  align-center  justify-center  pa4  br-100  ba  bw1  bc-black  ease-in-out  ${
                        currentNavSlide === i
                          ? 'bg-black  white'
                          : 'bg-white  black'
                      }`}
                    >
                      <div className="flex  flex-wrap">
                        <p className="col-24  t-primary  f5  f6-md  tac  lh-copy  pb2">
                          {item.title}
                        </p>
                        <p className="col-24  t-secondary  f7  tac  lh-copy">
                          {new Date(item.activeFrom).toDateString().slice(4)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="absolute  flex  justify-center  bottom  left  right">
                    <Button
                      /* Options */
                      type="secondary"
                      size="medium"
                      text="Access"
                      color="black"
                      fluid={false}
                      icon={buttonIconArrowRight}
                      iconFloat={null}
                      inverted
                      loading={false}
                      disabled={false}
                      onClick={() => {
                        setModalActive(i);
                      }}
                      /* Children */
                      withLinkProps={null}
                    />
                  </div>
                </article>

                <Modal
                  /* Options */
                  size="large"
                  active={modalActive === i}
                >
                  <div className="profile__dominion__carousel-item__modal-content  flex  flex-wrap  pb2">
                    <div className={`col-24  ${item.image && ''}`}>
                      <div className="relative  ph4  pt4  pb2">
                        <p className="t-secondary  f7  grey  pb2">
                          {new Date(item.activeFrom).toDateString()}
                        </p>

                        <p className="t-primary  f5  f4-md  black  pb3  mb2">
                          {item.title}
                        </p>

                        <div className="rich-text  pb2">
                          <BlockContent blocks={item.description} />
                        </div>

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
                      <div className="w-100  w-50-md  mla  mra">
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
                          customClass={null}
                          onClick={null}
                          /* Children */
                          withLinkProps={null}
                        />
                      </div>
                    )}
                  </div>

                  <div className="col-24  flex  justify-center  pt3">
                    <Button
                      /* Options */
                      type="primary"
                      size="small"
                      text="Close"
                      color="black"
                      fluid={false}
                      icon={null}
                      iconFloat={null}
                      inverted={false}
                      loading={false}
                      disabled={false}
                      onClick={() => {
                        setModalActive(null);
                      }}
                      /* Children */
                      withLinkProps={null}
                    />
                  </div>
                </Modal>
              </>
            ))}

            <article className="www  keen-slider__slide  relative  pt3  ph3  pb4">
              <div className="relative  profile__dominion__carousel-item__wrapper">
                <div
                  className={`profile__dominion__carousel-item  mla  mra  flex  align-center  justify-center  pa4  br-100  ba  bw1  bc-silver  ease-in-out ${
                    sliderNav &&
                    currentNavSlide === sliderNav.details().size - 1
                      ? 'bg-silver  white'
                      : 'bg-white  silver'
                  }`}
                >
                  <div className="flex  flex-wrap">
                    <p className="col-24  t-primary  f5  f6-md  tac  lh-copy  pb2">
                      ???
                    </p>
                    <p className="col-24  t-secondary  f7  tac  lh-copy">
                      Next month
                    </p>
                  </div>
                </div>
              </div>

              <div className="absolute  flex  justify-center  bottom  left  right">
                <Button
                  /* Options */
                  type="secondary"
                  size="medium"
                  text="Access"
                  color="silver"
                  fluid={false}
                  icon={buttonIconArrowRight}
                  iconFloat={null}
                  inverted
                  loading={false}
                  disabled
                  onClick={null}
                  /* Children */
                  withLinkProps={null}
                />
              </div>
            </article>
          </div>
          {sliderNav && (
            <>
              <ArrowLeft
                onClick={(e) => {
                  // If not first slide
                  if (currentNavSlide !== 0) {
                    setCurrentNavSlide(currentNavSlide - 1);
                  }

                  sliderNav.prev();
                }}
                disabled={currentNavSlide === 0}
              />

              <ArrowRight
                onClick={(e) => {
                  // If not last slide
                  if (currentNavSlide !== sliderNav.details().size - 1) {
                    setCurrentNavSlide(currentNavSlide + 1);
                  }

                  sliderNav.next();
                }}
                disabled={currentNavSlide === sliderNav.details().size - 1}
              />
            </>
          )}
        </div>
      </>
    );
  }

  return (
    <Heading
      /* Options */
      htmlEntity="h1"
      text="N/A"
      color="black"
      size="medium"
      truncate={null}
      /* Children */
      withLinkProps={null}
    />
  );
}
