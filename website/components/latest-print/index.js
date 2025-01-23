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
  const [user, { loading, mutate, error }] = useUser();
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
    <div className="pv6">
      <Container>
        <div className="pb2 mb1 flex justify-center">
          <Heading
            htmlEntity="h3"
            text="Latest print highlights"
            color="black"
            size="medium"
          />
        </div>
        <div className="pb4 flex justify-center">
          <Heading
            htmlEntity="h4"
            text={`A look at ${latestIssue.title}`}
            color="silver"
            size="small"
          />
        </div>
      </Container>

      <div className="ph6-md">
        {isMobile ? (
          <div className="relative">
            <div ref={sliderRef} className="keen-slider">
              {latestIssue.images.map((image, index) => (
                <div key={index} className="keen-slider__slide">
                  <ImageNew
                    imageObject={image.imageObject}
                    alt={`Latest Print Image ${index + 1}`}
                    height={550}
                    className="bg-white w-100"
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap justify-between">
            {latestIssue.images.map((image, index) => (
              <div key={index} className="col-24 col-12-md col-6-lg pa3">
                <div className="flex flex-column">
                  <ImageNew
                    imageObject={image.imageObject}
                    alt={`Latest Print Image ${index + 1}`}
                    height={400}
                    className="bg-white shadow1 br3 w-100"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {!user && showDominionButton && (
        <div className="flex justify-center mt5 mt3-md">
          <Button
            /* Options */
            type="primary"
            size="small"
            text="Become a reader"
            color="black"
            fluid={false}
            icon={null}
            iconFloat={null}
            inverted={false}
            loading={false}
            disabled={false}
            skeleton={false}
            onClick={null}
            /* Children */
            withLinkProps={{
              type: 'next',
              href: '/dominion',
              target: null,
              routerLink: Link,
              routerLinkProps: {
                as: `/dominion`,
                scroll: false,
              },
            }}
          />
        </div>
      )}
    </div>
  );
}
