import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
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
} from 'next-pattern-library';

import Modal from '~/components/modal';
import { imageBuilder } from '~/lib/sanity/requests';

const CarouselItemSection = dynamic(() => import('./carousel-item-section'));

import { useApp } from '~/context-provider/app';
import { useUser } from '~/lib/hooks';

const buttonIconArrowRight = <Icon icon={['fas', 'arrow-right']} />;
const buttonIconArrowLeft = <Icon icon={['fas', 'arrow-left']} />;

export default function Carousel({ dominionItems, refreshDominion }) {
  const app = useApp();
  const [user, { loading, mutate, error }] = useUser();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [modalActive, setModalActive] = useState(false);
  const [canCarouselHide, setCanCarouselHide] = useState(false);
  const [canSectionShow, setCanSectionShow] = useState(false);
  const [canSectionHide, setCanSectionHide] = useState(false);

  const sliderNavOptions = {
    slidesPerView: app.deviceSize === 'md' ? 1 : 3,
    mode: 'snap',
    centered: app.deviceSize === 'md',
    spacing: 0,
    controls: app.deviceSize === 'md' ? true : false,
    initial: 0,
    slideChanged(s) {
      setCurrentSlide(s.details().relativeSlide);
    },
  };

  const [sliderNavRef, sliderNav] = useKeenSlider(sliderNavOptions);

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
              text="Dominion"
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

          <div className="dominion__carousel  navigation-wrapper  mb3-md">
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
                        style={{
                          backgroundImage: item?.image?.asset
                            ? `url(${imageBuilder
                                .image(item.image)
                                .auto('format')
                                .height(75)
                                .width(75)
                                .fit('clip')
                                .blur('20')
                                .url()})`
                            : 'url(https://cdn.sanity.io/images/q8z2vf2k/production/78e9b8033c9b75038ae1e5ef047110fd78b7372a-1080x816.png?rect=132,0,816,816&w=75&h=75&blur=20&fit=clip&auto=format)',
                        }}
                        className={`profile__dominion__carousel-item  mla  mra  flex  align-center  justify-center  pa4  br4  shadow2`}
                      >
                        <div className="flex  flex-wrap">
                          <p className="col-24  t-primary  white  f5  f6-md  tac  lh-copy  pb2  text-shadow">
                            {item.title}
                          </p>
                          <p className="col-24  t-secondary  white  f7  tac  lh-copy  text-shadow">
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
            </div>

            {sliderNav && app.deviceSize !== 'md' ? (
              <>
                <ArrowLeft
                  onClick={(e) => {
                    // If not first slide
                    if (currentSlide !== 0) {
                      setCurrentSlide(
                        currentSlide - sliderNavOptions.slidesPerView
                      );
                    }

                    sliderNav.prev();
                  }}
                  disabled={currentSlide === 0}
                />

                <ArrowRight
                  onClick={(e) => {
                    // If not last slide
                    if (currentSlide !== sliderNav.details().size - 1) {
                      setCurrentSlide(
                        currentSlide + sliderNavOptions.slidesPerView
                      );
                    }

                    sliderNav.next();
                  }}
                  disabled={
                    currentSlide >=
                    sliderNav.details().size - sliderNavOptions.slidesPerView
                  }
                />
              </>
            ) : null}
          </div>

          {app.deviceSize === 'md' ? (
            <div className="dots">
              {dominionItems.map((item, i) => {
                return (
                  <button
                    key={i}
                    className={'dot' + (currentSlide === i ? ' active' : '')}
                  />
                );
              })}
            </div>
          ) : null}
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

              {modalActive === i && <CarouselItemSection item={item} />}
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
