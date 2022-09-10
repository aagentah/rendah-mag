import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useKeenSlider } from 'keen-slider/react';

import Heading from '~/components/elements/heading';
import Button from '~/components/elements/button';
import Icon from '~/components/elements/icon';

import { imageBuilder } from '~/lib/sanity/requests';

import { useApp } from '~/context-provider/app';
import { useUser } from '~/lib/hooks';

const CarouselItemSection = dynamic(() => import('./carousel-item-section'));

const buttonIconArrowRight = <Icon icon={['fas', 'arrow-right']} />;
const buttonIconArrowLeft = <Icon icon={['fas', 'arrow-left']} />;

export default function Carousel({ packItems, refreshDominion }) {
  const app = useApp();
  const scale = app?.isRetina ? 2 : 1;
  const [user, { loading, mutate, error }] = useUser();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [modalActive, setModalActive] = useState(false);
  const [canCarouselHide, setCanCarouselHide] = useState(false);
  const [canSectionShow, setCanSectionShow] = useState(false);
  const [canSectionHide, setCanSectionHide] = useState(false);
  const disableArrows = packItems?.length <= (app.deviceSize === 'md' ? 1 : 3);

  const sliderNavOptions = {
    slidesPerView: app.deviceSize === 'md' ? 1 : 3,
    mode: 'snap',
    centered: app.deviceSize === 'md',
    spacing: 0,
    controls: app.deviceSize === 'md',
    initial: 0,
    slideChanged(s) {
      setCurrentSlide(s.details().relativeSlide);
    }
  };

  const [sliderNavRef, sliderNav] = useKeenSlider(sliderNavOptions);

  const ArrowLeft = props => {
    const { onClick, disabled } = props;

    return (
      <button
        onClick={onClick}
        type="button"
        className={`carousel-arrow--left  pa2 ${
          disabled ? 'light-grey' : 'white  cp'
        }`}
      >
        <Icon
          icon={['fas', 'chevron-left']}
          size={app.deviceSize === 'md' ? '3x' : '2x'}
        />
      </button>
    );
  };

  const ArrowRight = props => {
    const { onClick, disabled } = props;

    return (
      <button
        onClick={onClick}
        type="button"
        className={`carousel-arrow--right  pa2 ${
          disabled ? 'light-grey' : 'white  cp'
        }`}
      >
        <Icon
          icon={['fas', 'chevron-right']}
          size={app.deviceSize === 'md' ? '3x' : '2x'}
        />
      </button>
    );
  };

  const renderGhostCards = () => {
    let loop;
    const arr = [];

    if (packItems.length === 0) loop = app.deviceSize === 'md' ? 1 : 3;
    if (packItems.length === 1) loop = 2;
    if (packItems.length === 2) loop = 1;
    if (!loop) return false;
    if (packItems.length > 0 && app.deviceSize === 'md') return false;

    for (let i = 0; i < loop; i++) {
      arr.push(
        <article
          className="www  keen-slider__slide  relative  pt3  ph3  pb4"
          key={i}
        >
          <div className="relative  profile__dominion__carousel-item__wrapper">
            <div className="profile__dominion__carousel-item  mla  mra  flex  align-center  justify-center  pa4  br4  bg-light-grey">
              <div className="flex  flex-wrap">
                <p className="col-24  t-primary  grey  f5  f6-md  tac  lh-copy  pb2">
                  ???
                </p>
                <p className="col-24  t-secondary  grey  f7  tac  lh-copy">
                  ???
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
              color="moon-grey"
              fluid={false}
              icon={buttonIconArrowRight}
              iconFloat={null}
              inverted
              loading={false}
              disabled={false}
              skeleton={false}
              onClick={null}
              /* Children */
              withLinkProps={null}
            />
          </div>
        </article>
      );
    }

    return arr;
  };

  if (refreshDominion) {
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
              text="Packs"
              color="white"
              size="medium"
              truncate={null}
              /* Children */
              withLinkProps={null}
            />
          </div>
          <div className="pb4  mb2">
            <p className="white  f6  lh-copy">
              Sample packs available to download, exclusively on the Dominion.
            </p>
          </div>

          <div className="dominion__carousel  navigation-wrapper  mb3-md">
            <div
              ref={sliderNavRef}
              className="keen-slider  flex  align-center  pb4"
            >
              {packItems.map((item, i) => (
                <article
                  className="www  keen-slider__slide  relative  pt3  ph3  pb4"
                  key={item._id}
                >
                  <div className="relative  profile__dominion__carousel-item__wrapper">
                    <div
                      style={{
                        backgroundImage: `url(${imageBuilder
                          .image(item.image)
                          .width(250 * scale)
                          .height(250 * scale)
                          .blur(100)
                          .auto('format')
                          .fit('scale')
                          .url()})`
                      }}
                      className="profile__dominion__carousel-item  mla  mra  flex  align-center  justify-center  pa4  br4  shadow2"
                    >
                      <div className="flex  flex-wrap">
                        <p className="col-24  t-primary  white  f5  f6-md  tac  lh-copy  text-shadow">
                          {item.title}
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
                      color="white"
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
              ))}

              {renderGhostCards()}
            </div>

            {sliderNav && app.deviceSize !== 'md' ? (
              <>
                <ArrowLeft
                  onClick={e => {
                    // If not first slide
                    if (currentSlide !== 0) {
                      setCurrentSlide(
                        currentSlide - sliderNavOptions.slidesPerView
                      );
                    }

                    sliderNav.prev();
                  }}
                  disabled={currentSlide === 0 || disableArrows}
                />

                <ArrowRight
                  onClick={e => {
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
                      sliderNav.details().size -
                        sliderNavOptions.slidesPerView || disableArrows
                  }
                />
              </>
            ) : null}
          </div>

          {app.deviceSize === 'md' && packItems.length > 1 ? (
            <div className="dots">
              {packItems.map((item, i) => {
                return (
                  <button
                    key={i}
                    className={`dot${currentSlide === i ? ' active' : ''}`}
                  />
                );
              })}
            </div>
          ) : null}
        </section>

        {packItems.map((item, i) => (
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
                color="white"
                fluid={false}
                icon={buttonIconArrowLeft}
                iconFloat="left"
                inverted={true}
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

              {modalActive === i && <CarouselItemSection pack={item} />}
            </section>
          </>
        ))}
      </div>
    );
  }
}
