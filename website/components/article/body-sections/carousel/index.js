import { useState } from 'react';
import { Image } from 'next-pattern-library';
import LazyLoad from 'react-lazyload';
import BlockContent from '@sanity/block-content-to-react';
import isArray from 'lodash/isArray';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';

import { imageBuilder } from '~/lib/sanity/requests';
import { SANITY_BLOCK_SERIALIZERS } from '~/constants';

export default function ImageSection({ carousel }) {
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

  const renderItem = () => {
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
      <figure className="keen-slider__slide number-slide1">
        <Image
          /* Options */
          src={imageBuilder
            .image(section.asset)
            .auto('format')
            .fit('clip')
            .url()}
          placeholder={imageBuilder
            .image(section.asset)
            .height(25)
            .width(25)
            .auto('format')
            .fit('clip')
            .blur('20')
            .url()}
          alt="This is the alt text."
          figcaption={null}
          height={null}
          width={null}
          customClass="shadow2"
          skeleton={false}
          onClick={null}
          /* Children */
          withLinkProps={null}
        />
        {handleCaption()}
      </figure>
    );
  };

  return (
    <>
      <div className="navigation-wrapper">
        <div ref={sliderRef} className="keen-slider">
          {carousel.map((image, i) => (
            <div key={image} className="col-24  col-6-md">
              {renderItem(image)}
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
                className={'dot' + (currentSlide === idx ? ' active' : '')}
              ></button>
            );
          })}
        </div>
      )}
    </>
  );
}
