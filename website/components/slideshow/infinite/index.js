import { useState, useEffect, useRef } from 'react';
import { useKeenSlider } from 'keen-slider/react';

import { imageBuilder } from '~/lib/sanity/requests';
import { useApp } from '~/context-provider/app';

import CardInfinite from '~/components/card/infinite';

export default function SlideshowInfinite({ postsLength, posts }) {
  const app = useApp();
  const [pause, setPause] = useState(false);
  const timer = useRef();
  const [sliderRef, slider] = useKeenSlider({
    controls: false,
    slidesPerView: app.deviceSize === 'md' ? 2 : 5,
    spacing: 15,
    loop: true,
    duration: 1000,
    mode: 'snap',
    dragStart: () => {
      setPause(true);
    },
    dragEnd: () => {
      setPause(false);
    },
  });

  useEffect(() => {
    sliderRef.current.addEventListener('mouseover', () => {
      setPause(true);
    });
    sliderRef.current.addEventListener('mouseout', () => {
      setPause(false);
    });
  }, [sliderRef]);

  useEffect(() => {
    timer.current = setInterval(() => {
      if (!pause && slider) {
        slider.next();
      }
    }, 2000);
    return () => {
      clearInterval(timer.current);
    };
  }, [pause, slider]);

  return (
    <>
      <div ref={sliderRef} className="keen-slider">
        {[...Array(postsLength)].map((iteration, i) => (
          <div key={iteration} className="keen-slider__slide">
            <div className="ph3  pv2">
              <CardInfinite
                i={i}
                post={posts?.articles && posts?.articles[i]}
                columnCount={4}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
