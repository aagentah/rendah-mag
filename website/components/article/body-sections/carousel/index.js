import React, { useState } from 'react';
import { Image } from 'next-pattern-library';
import BlockContent from '@sanity/block-content-to-react';
import isArray from 'lodash/isArray';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react'; // import from 'keen-slider/react.es' for to get an ES module

import { imageBuilder } from '~/lib/sanity/requests';
import { SANITY_BLOCK_SERIALIZERS } from '~/constants';
import { useApp } from '~/context-provider/app';

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
  // return;

  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  const app = useApp();
  const scale = app?.isRetina ? 2 : 1;
  const imageUrlWidth = 500;

  const handleCaption = () => {
    let { caption, source } = section;

    // If blockContent
    if (isArray(caption)) {
      return (
        <figcaption className="caption  pv2">
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

  return (
    <>
      <div ref={sliderRef} className="keen-slider">
        {section?.images?.length &&
          section.images.map((p, i) => (
            <div className="keen-slider__slide">
              <img
                className="w-100  shadow2"
                style={{
                  height: section?.carouselHeight,
                  objectFit: 'cover',
                }}
                src={imageBuilder
                  .image(p)
                  .width(imageUrlWidth * scale)
                  .auto('format')
                  .fit('clip')
                  .url()}
              />

              {handleCaption()}
            </div>
          ))}

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
                currentSlide ===
                instanceRef.current.track.details.slides.length - 1
              }
            />
          </>
        )}
      </div>

      {loaded && instanceRef.current && (
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
      )}
    </>
  );
}
