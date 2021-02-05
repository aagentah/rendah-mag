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

import Sections from '~/components/article/body-sections';

import { useApp } from '~/context-provider/app';
import { useUser } from '~/lib/hooks';
import setCharAt from '~/functions/setCharAt';
import { imageBuilder } from '~/lib/sanity/requests';

const buttonIconArrowRight = <Icon icon={['fas', 'arrow-right']} />;
const buttonIconArrowLeft = <Icon icon={['fas', 'arrow-left']} />;

export default function Carousel({ dominionItems, refreshDominion }) {
  const app = useApp();
  const [user, { loading, mutate, error }] = useUser();
  const [currentNavSlide, setCurrentNavSlide] = useState(0);
  const [modalActive, setModalActive] = useState(false);
  const [canCarouselHide, setCanCarouselHide] = useState(false);
  const [canSectionShow, setCanSectionShow] = useState(false);
  const [canSectionHide, setCanSectionHide] = useState(false);
  const [currentAudioSelected, setCurrentAudioSelected] = useState(false);

  const sliderNavOptions = {
    slidesPerView: app.deviceSize === 'md' ? 1 : 3,
    mode: 'snap',
    centered: app.deviceSize === 'md',
    spacing: 0,
    controls: false,
    initial: 0,
  };

  const [sliderNavRef, sliderNav] = useKeenSlider(sliderNavOptions);
  const handleAudioPlay = (playerRef) => setCurrentAudioSelected(playerRef);

  const ArrowLeft = (props) => {
    const { onClick, disabled } = props;

    return (
      <button
        onClick={onClick}
        type="button"
        className={`carousel-arrow--left  pa2 ${
          disabled ? 'light-grey' : 'black  cp'
        }`}
      >
        <Icon
          icon={['fas', 'chevron-left']}
          size={app.deviceSize === 'md' ? '3x' : '2x'}
        />
      </button>
    );
  };

  const ArrowRight = (props) => {
    const { onClick, disabled } = props;

    return (
      <button
        onClick={onClick}
        type="button"
        className={`carousel-arrow--right  pa2 ${
          disabled ? 'light-grey' : 'black  cp'
        }`}
      >
        <Icon
          icon={['fas', 'chevron-right']}
          size={app.deviceSize === 'md' ? '3x' : '2x'}
        />
      </button>
    );
  };

  if (refreshDominion && dominionItems.length) {
    return (
      <div className="min">
        <section
          className={`
          dominion-carousel-wrapper
          ${!modalActive ? 'dominion-canDisplay  dominion-fadeIn' : ''}
          ${canCarouselHide ? 'dominion-fadeOut' : ''}
          `}
        >
          <div className="pb2">
            <Heading
              /* Options */
              htmlEntity="h1"
              text="Dominion."
              color="black"
              size="medium"
              truncate={null}
              /* Children */
              withLinkProps={null}
            />
          </div>
          <div className="pb4  mb2">
            {user?.dominionSince && (
              <p className="t-secondary  f7  grey  pb2">
                <span className="bold  pr1">Member since:</span>
                {new Date(user.dominionSince).toDateString()}
              </p>
            )}

            <p className="black  f6  lh-copy">
              Here you can access your monthly Dominion content. We&apos;ll
              usually email you when new items pop up here.
            </p>
          </div>

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
                            ? 'bg-black-md  white-md'
                            : 'bg-white  black'
                        }`}
                      >
                        <div className="flex  flex-wrap">
                          <p className="col-24  t-primary  f5  f6-md  tac  lh-copy  pb2">
                            {item.title}
                          </p>
                          <p className="col-24  t-secondary  f7  tac  lh-copy">
                            {i === 0
                              ? '<3'
                              : new Date(item.activeFrom)
                                  .toDateString()
                                  .slice(4)}
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
                        skeleton={false}
                        onClick={() => {
                          setModalActive(i);
                          setCanCarouselHide(true);

                          setTimeout(() => {
                            setCanSectionShow(true);
                            setCanSectionHide(false);
                          }, 300);
                        }}
                        /* Children */
                        withLinkProps={null}
                      />
                    </div>
                  </article>
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
                        Coming soon
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
                    skeleton={false}
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
        </section>

        {dominionItems.map((item, i) => (
          <>
            <section
              className={`
                dominion-section
                ${modalActive === i ? 'dominion-canDisplay' : ''}
                ${canSectionShow ? 'dominion-fadeIn' : ''}
                ${canSectionHide ? 'dominion-fadeOut' : ''}
                `}
            >
              <Button
                /* Options */
                type="secondary"
                size="small"
                text="Back"
                color="black"
                fluid={false}
                icon={buttonIconArrowLeft}
                iconFloat={'left'}
                inverted={false}
                loading={false}
                disabled={false}
                skeleton={false}
                onClick={() => {
                  setCanSectionHide(true);

                  setTimeout(() => {
                    setCanCarouselHide(false);
                    setModalActive(null);
                    setCanSectionShow(false);
                  }, 300);
                }}
                /* Children */
                withLinkProps={null}
              />

              <div className="flex  flex-wrap  pb2">
                <div className={`col-24  ${item.image && ''}`}>
                  <div className="relative  ph4  pt4  pb2">
                    <p className="t-secondary  f7  grey  pb2">
                      {new Date(item.activeFrom).toDateString()}
                    </p>

                    <p className="t-primary  f5  f4-md  black  pb3  mb2">
                      {item.title}
                    </p>

                    {
                      // <div className="rich-text  pb2">
                      //   <BlockContent blocks={item.description} />
                      // </div>
                    }

                    {item?.body && (
                      <div className="rich-text  pb2">
                        <Sections
                          test="123"
                          handleAudioPlay={handleAudioPlay}
                          currentAudioSelected={currentAudioSelected}
                          body={item.body}
                        />
                      </div>
                    )}

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
                              skeleton={false}
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
                  <div className="w-100  mla  mra  ph4  ph5-md">
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
                      customClass={'br4'}
                      skeleton={false}
                      onClick={null}
                      /* Children */
                      withLinkProps={null}
                    />
                  </div>
                )}
              </div>
            </section>
          </>
        ))}
      </div>
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
