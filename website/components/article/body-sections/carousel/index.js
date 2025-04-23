import React, { useState, useEffect } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import LazyLoad from 'react-lazyload';
import 'keen-slider/keen-slider.min.css';

import { imageBuilder } from '~/lib/sanity/requests';
import { useApp } from '~/context-provider/app';

function Arrow({ left, onClick, disabled }) {
  const disabledClass = disabled ? ' opacity-50' : '';
  return (
    <svg
      onClick={onClick}
      className={`w-6 h-6 cursor-pointer ${
        left ? 'mr-2' : 'ml-2'
      }${disabledClass}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      {left ? (
        <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
      ) : (
        <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
      )}
    </svg>
  );
}

export default function Carousel({ section }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const app = useApp();
  const scale = app?.isRetina ? 2 : 1;
  const imageUrlWidth = 500;
  const slidesPerView =
    app.deviceSize === 'md' ? 1 : section?.slidesPerViewDesktop || 1;
  const height =
    app.deviceSize === 'md'
      ? section?.carouselHeight || section.carouselHeightMobile
      : section?.carouselHeight || section.carouselHeightDesktop;

  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    loop: false,
    renderMode: 'performance',
    drag: true,
    slides: { perView: slidesPerView },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  // Safety check
  if (!section?.images?.length) {
    return null;
  }

  // Create an array of valid images with URLs
  const validImages = section.images
    .map((image, i) => {
      try {
        // Fall back to a static placeholder URL if we can't build the image URL
        let imgSrc = 'https://via.placeholder.com/500';

        try {
          if (image.asset) {
            imgSrc = imageBuilder
              .image(image.asset)
              .width(imageUrlWidth * scale)
              .auto('format')
              .fit('clip')
              .url();
          } else if (image.imageObject && image.imageObject.url) {
            // Try direct URL if available
            imgSrc = image.imageObject.url;
          }
        } catch (error) {
          console.error('Error building image URL:', error);
        }

        return {
          id: image._key || `img-${i}`,
          src: imgSrc,
        };
      } catch (e) {
        console.error('Error processing image:', e);
        return null;
      }
    })
    .filter(Boolean); // Remove any nulls

  // If no valid images, don't render
  if (!validImages.length) {
    return null;
  }

  return (
    <LazyLoad once offset={250} height={height}>
      <div className="relative w-full">
        <div ref={sliderRef} className="keen-slider">
          {validImages.map((image) => (
            <div key={image.id} className="keen-slider__slide px-2 pb-4">
              <img
                className="w-full rounded shadow"
                style={{ height, objectFit: 'cover' }}
                src={image.src}
                alt=""
              />
            </div>
          ))}
        </div>
        {loaded && instanceRef.current && (
          <div className="absolute inset-0 flex items-center justify-between px-4">
            <Arrow
              left
              onClick={(e) => {
                e.stopPropagation();
                instanceRef.current.prev();
              }}
              disabled={currentSlide === 0}
            />
            <Arrow
              onClick={(e) => {
                e.stopPropagation();
                instanceRef.current.next();
              }}
              disabled={
                currentSlide >=
                instanceRef.current.track.details.slides.length -
                  instanceRef.current.options.slides.perView
              }
            />
          </div>
        )}
      </div>
    </LazyLoad>
  );
}
