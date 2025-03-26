import { useState, useEffect } from 'react';
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

export default function LatestPrint({ showDominionButton }) {
  const app = useApp();
  const [user] = useUser();
  const [latestIssue, setLatestIssue] = useState(null);
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    renderMode: 'performance',
    drag: true,
    slides: { perView: 1 },
  });
  const router = useRouter();
  const isMobile = app.deviceSize === 'md';

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
        <h3 className="text-neutral-400 mb-2">Latest print</h3>
        <p className="text-neutral-500 text-sm">{`${latestIssue.title}`}</p>
      </div>

      <div className="mb-16">
        {isMobile ? (
          <div className="relative">
            <div ref={sliderRef} className="keen-slider">
              {latestIssue.images.map((image, index) => (
                <div key={index} className="keen-slider__slide">
                  <ImageNew
                    imageObject={image.imageObject}
                    alt={`Latest Print Image ${index + 1}`}
                    height={550}
                    className="bg-white w-full"
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-4">
            {latestIssue.images.map((image, index) => (
              <ImageNew
                imageObject={image.imageObject}
                alt={`Latest Print Image ${index + 1}`}
                height={400}
                className="brightness-75"
              />
            ))}
          </div>
        )}
      </div>

      {!user && showDominionButton && (
        <div className="mb-12">
          <Link href="/membership" legacyBehavior>
            <a className="text-sm border-b border-neutral-300 pb-1">
              <span className="text-neutral-300">
                Join Membership [includes latest print]
              </span>
            </a>
          </Link>
        </div>
      )}
    </div>
  );
}
