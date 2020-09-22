import { useState, useEffect } from 'react';
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

import { useApp } from '~/context-provider/app';
import { useUser } from '~/lib/hooks';
import setCharAt from '~/functions/setCharAt';

import { imageBuilder, getDominionItemsSinceDate } from '~/lib/sanity/requests';

function ArrowLeft(props) {
  return (
    <div
      onClick={props.onClick}
      className={`carousel-arrow--left ${
        props.disabled ? 'light-grey' : 'black  cp'
      }`}
    >
      <Icon icon={['fas', 'chevron-left']} size="2x" />
    </div>
  );
}

function ArrowRight(props) {
  return (
    <div
      onClick={props.onClick}
      className={`carousel-arrow--right ${
        props.disabled ? 'light-grey' : 'black  cp'
      }`}
    >
      <Icon icon={['fas', 'chevron-right']} size="2x" />
    </div>
  );
}

export default function Carousel({ dominionItems, refreshDominion }) {
  const app = useApp();
  const [user, { loading, mutate, error }] = useUser();

  const [currentNavSlide, setCurrentNavSlide] = useState(0);

  const sliderNavOptions = {
    slidesPerView: app.deviceSize === 'md' ? 1 : 3,
    mode: 'snap',
    centered: false,
    spacing: 0,
    controls: false,
    initial: 0,
  };

  const sliderBodyOptions = {
    slidesPerView: 1,
    mode: 'snap',
    centered: true,
    controls: false,
    spacing: 30,
    initial: 0,
  };

  const [sliderNavRef, sliderNav] = useKeenSlider(sliderNavOptions);
  const [sliderBodyRef, sliderBody] = useKeenSlider(sliderBodyOptions);

  if (refreshDominion && dominionItems.length) {
    return (
      <>
        <div className="navigation-wrapper  mb3-md">
          <div ref={sliderNavRef} className="keen-slider  flex  align-center">
            {dominionItems.map((item, i) => (
              <article className="keen-slider__slide  pa3" key={item._id}>
                <div className="relative">
                  <div
                    className={`br4  ph4  pv3  ba  bw1  bc-black  ${
                      currentNavSlide === i
                        ? 'bg-black  white'
                        : 'bg-white  black'
                    }`}
                  >
                    {i === 0 && (
                      <div className="absolute  top  right  mr3  nt2">
                        <Label
                          /* Options */
                          customClass="ph2"
                          text="New"
                          color="white"
                          backgroundColor="blue"
                          onClick={null}
                          /* Children */
                          withLinkProps={null}
                        />
                      </div>
                    )}
                    <p className="t-primary  f5">{item.title}</p>
                  </div>
                </div>
              </article>
            ))}
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
                  sliderBody.prev();
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
                  sliderBody.next();
                }}
                disabled={currentNavSlide === sliderNav.details().size - 1}
              />
            </>
          )}
        </div>

        <hr />

        <div ref={sliderBodyRef} className="keen-slider  flex  align-start">
          {dominionItems.map((item, i) => (
            <article className="keen-slider__slide" key={item._id}>
              <div className="flex  flex-wrap">
                <div className={`col-24  ${item.image && 'col-12-md'}`}>
                  <div className="relative  pa4">
                    <p className="t-secondary  f7  grey  pb2">
                      {new Date(item.activeFrom).toDateString()}
                    </p>

                    <p className="t-primary  f4  black  pb3  mb2">
                      {item.title}
                    </p>

                    <div className="flex  flex-wrap  pb3">
                      {item?.tags &&
                        item.tags.map((tag) => (
                          <div key={tag} className="mr2  mb3">
                            <Label
                              /* Options */
                              customClass="ph2"
                              text={tag}
                              color="white"
                              backgroundColor="black"
                              onClick={null}
                              /* Children */
                              withLinkProps={null}
                            />
                          </div>
                        ))}
                    </div>

                    <div className="post__body">
                      <BlockContent blocks={item.mainDescription} />
                    </div>
                  </div>
                </div>
                {item.image && (
                  <div className="col-24  col-12-md  ph2  pa4-md">
                    <Image
                      /* Options */
                      src={imageBuilder
                        .image(item.image)
                        .width(200)
                        .height(200)
                        .auto('format')
                        .fit('clip')
                        .url()}
                      placeholder={imageBuilder
                        .image(item.image)
                        .height(200 / 10)
                        .width(200 / 10)
                        .auto('format')
                        .fit('clip')
                        .blur('20')
                        .url()}
                      alt={item.title}
                      figcaption={null}
                      height={200}
                      width={null}
                      customClass={null}
                      onClick={null}
                      /* Children */
                      withLinkProps={null}
                    />
                  </div>
                )}
              </div>
            </article>
          ))}
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
      reveal={null}
      /* Children */
      withLinkProps={null}
    />
  );
}
