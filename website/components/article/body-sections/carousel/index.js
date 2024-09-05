import React, { useState } from 'react';
import BlockContent from '@sanity/block-content-to-react';
import isArray from 'lodash/isArray';
import 'keen-slider/keen-slider.min.css';
import LazyLoad from 'react-lazyload';

import ImageNew from '~/components/elements/image-new';

import { imageBuilder } from '~/lib/sanity/requests';
import { SANITY_BLOCK_SERIALIZERS } from '~/constants';
import { useApp } from '~/context-provider/app';
import { useFirstRender } from '~/lib/useFirstRender';

function Arrow(props) {
  const disabeld = props.disabled ? ' arrow--disabled' : '';
  return (
    <svg
      onClick={props.onClick}
      className={`arrow ${
        props.left ? 'arrow--left' : 'arrow--right'
      } ${disabeld}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      {props.left && (
        <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
      )}
      {!props.left && (
        <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
      )}
    </svg>
  );
}

export default function ImageSection({ section }) {
  console.log('section', section);
  const [useKeenSliderHook, setUseKeenSliderHook] = useState(false);

  if (useFirstRender() || !useKeenSliderHook) {
    const action = async () => {
      const { useKeenSlider } = await import('keen-slider/react');
      setUseKeenSliderHook({ hook: useKeenSlider });
    };

    action();
    return false;
  }

  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const app = useApp();
  const scale = app?.isRetina ? 2 : 1;
  const imageUrlWidth = 500;

  let slidersPerView;

  if (app.deviceSize === 'md') {
    slidersPerView = 1;
  } else {
    slidersPerView = section?.slidesPerViewDesktop || 1;
  }

  const height =
    app.deviceSize === 'md'
      ? section.carouselHeightMobile
      : section.carouselHeightDesktop;

  const [sliderRef, instanceRef] = useKeenSliderHook.hook({
    initial: 0,
    loop: false,
    renderMode: 'performance',
    drag: true,
    slides: { perView: slidersPerView },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  const handleCaption = (image) => {
    let { caption, source } = image;

    console.log('caption', caption);

    // If blockContent
    if (isArray(caption)) {
      return (
        <figcaption className="richtext-image-caption tac mla mra pt3 o-50">
          <BlockContent
            blocks={caption}
            serializers={SANITY_BLOCK_SERIALIZERS}
          />
        </figcaption>
      );
    }

    // Fallback for old text
    if (caption) {
      if (source) {
        return (
          <a
            className="caption  pv2"
            href={source}
            target="_blank"
            rel="noopener noreferrer"
          >
            {caption}
          </a>
        );
      }

      return <span className="caption  pv2">{caption}</span>;
    }
  };

  console.log('section', section);

  return (
    <LazyLoad once offset={250} height={height || section?.carouselHeight}>
      <div className="col-24  col-12-md mla mra relative">
        <div ref={sliderRef} className="keen-slider">
          {section?.images?.length &&
            section.images.map((p, i) => (
              <div className="keen-slider__slide ph2 pb4">
                {/* <img
                  className="w-100  shadow2 br3"
                  style={{
                    height: height || section?.carouselHeight,
                    objectFit: 'cover',
                  }}
                  src={imageBuilder
                    .image(p)
                    .width(imageUrlWidth * scale)
                    .auto('format')
                    .fit('clip')
                    .url()}
                /> */}

                <ImageNew
                  imageObject={p?.imageObject}
                  height={height || section?.carouselHeight}
                  // width={height || section?.carouselHeight}
                  isExpandable
                  className="w-100  shadow2 br3"
                />

                {/* {handleCaption(p?.imageObject)} */}
              </div>
            ))}
        </div>

        {loaded && instanceRef.current && (
          <>
            <Arrow
              left
              onClick={(e) =>
                e.stopPropagation() || instanceRef.current?.prev()
              }
              disabled={currentSlide === 0}
            />

            <Arrow
              onClick={(e) =>
                e.stopPropagation() || instanceRef.current?.next()
              }
              disabled={
                currentSlide >=
                instanceRef.current.track.details.slides.length -
                  instanceRef.current.options.slides.perView
              }
            />
          </>
        )}

        {/* {loaded && instanceRef.current && (
          <div className="dots">
            {[
              ...Array(instanceRef.current.track.details.slides.length).keys(),
            ].map((idx) => {
              return (
                <button
                  key={idx}
                  onClick={() => {
                    instanceRef.current?.moveToIdx(idx);
                  }}
                  className={`dot${currentSlide === idx ? ' active' : ''}`}
                />
              );
            })}
          </div>
        )} */}
      </div>
    </LazyLoad>
  );
}
