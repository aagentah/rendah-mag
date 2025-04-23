import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useKeenSlider } from 'keen-slider/react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { getLatestPrintedIssue } from '~/lib/sanity/requests';
import ImageNew from '~/components/elements/image-new';
import Heading from '~/components/elements/heading';
import Container from '~/components/layout/container';
import Button from '~/components/elements/button';

import 'keen-slider/keen-slider.min.css';
import { useApp } from '~/context-provider/app';
import { useUser } from '~/lib/hooks';

const IconArrowRight = dynamic(() =>
  import('~/components/elements/icon').then((m) => m.IconArrowRight)
);

export default function LatestPrint({ showDominionButton }) {
  const app = useApp();
  const [user] = useUser();
  const [latestIssue, setLatestIssue] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: false,
    renderMode: 'performance',
    drag: true,
    slides: { perView: 1 },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
  });
  const router = useRouter();
  const isMobile = app.deviceSize === 'md';
  const buttonIconRed = <IconArrowRight color="#e9393f" size={16} />;

  useEffect(() => {
    const fetchLatestIssue = async () => {
      const issue = await getLatestPrintedIssue();
      setLatestIssue(issue);
    };
    fetchLatestIssue();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      instanceRef.current?.moveToIdx(instanceRef.current.track.details.abs + 1);
    }, 7500);
    return () => clearInterval(interval);
  }, [instanceRef]);

  if (!latestIssue) {
    return null; // or a loading indicator
  }

  return (
    <div className="container py-6">
      <div className="mb-12">
        <h2 className="text-neutral-300 mb-2">
          Latest print{' '}
          <span className="text-neutral-500">[{`${latestIssue.title}`}]</span>
        </h2>
      </div>

      <div className="mb-12">
        {isMobile ? (
          <div className="relative">
            <div ref={sliderRef} className="keen-slider">
              {latestIssue.images.map((image, index) => (
                <div key={index} className="keen-slider__slide">
                  <ImageNew
                    imageObject={image.imageObject}
                    alt={`Latest Print Image ${index + 1}`}
                    height={350}
                    className="brightness-75 w-full"
                  />
                </div>
              ))}
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center mt-4 space-x-2">
              {latestIssue.images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => instanceRef.current?.moveToIdx(idx)}
                  className={`h-2 w-2 rounded-full transition-colors duration-300 ${
                    currentSlide === idx ? 'bg-neutral-300' : 'bg-neutral-700'
                  }`}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-4">
            {latestIssue.images.map((image, index) => (
              <ImageNew
                imageObject={image.imageObject}
                alt={`Latest Print Image ${index + 1}`}
                height={350}
                className="brightness-75"
              />
            ))}
          </div>
        )}
      </div>

      {!user && showDominionButton && (
        <div className="mb-12">
          <Button
            /* Options */
            type="secondary"
            size="small"
            text="Explore Membership"
            color="rendah-red"
            fluid={false}
            icon={buttonIconRed}
            iconFloat={null}
            inverted={true}
            loading={false}
            disabled={false}
            skeleton={false}
            onClick={null}
            /* Children */
            withLinkProps={{
              type: 'next',
              href: '/membership',
              target: null,
              routerLink: null,
              routerLinkProps: null,
            }}
          />

          <p className="text-xs text-neutral-500 pt-2">
            [Includes latest print]
          </p>
        </div>
      )}
    </div>
  );
}
