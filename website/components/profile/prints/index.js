import { useState, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import NProgress from 'nprogress';

import Heading from '~/components/elements/heading';
import Button from '~/components/elements/button';
import CardPrint from '~/components/card/print';

import { useUser } from '~/lib/hooks';

import { getAllPrints } from '~/lib/sanity/requests';

const IconArrowLeft = dynamic(() =>
  import('~/components/elements/icon').then((m) => m.IconArrowLeft)
);

export default function ProfilePrints() {
  const [user, { loading, mutate, error }] = useUser();
  const [samples, setSamples] = useState([]);
  const [samplesLength, setSamplesLength] = useState(24);
  const [currentAudioSelected, setCurrentAudioSelected] = useState(false);
  const handleAudioPlay = (playerRef) => setCurrentAudioSelected(playerRef);
  const [modalActive, setModalActive] = useState(false);
  const [cardsShow, setCardsShow] = useState(true);
  const [showAll, setShowAll] = useState(false);

  const startProgress = () => {
    NProgress.start();
    setTimeout(() => NProgress.done(), 750);
  };

  const buttonIconArrowLeft = <IconArrowLeft color="white" size={16} />;

  const apply = (i) => {
    setModalActive(i);
    setCardsShow(false);
  };

  // Fetch samples
  useEffect(() => {
    const action = async () => {
      const data = await getAllPrints();
      if (data) {
        setSamples(data);
        setSamplesLength(data?.length);
        console.log('data', data);
      }
    };

    action();
  }, [showAll]);

  if (user?.isDominion) {
    return (
      <>
        <section>
          <div className="profile_heading">
            <Heading
              /* Options */
              htmlEntity="h1"
              text="Prints"
              color="white"
              size="medium"
              truncate={null}
              /* Children */
              withLinkProps={null}
            />
          </div>

          <div className="relative  ">
            <div
              className={`
              dominion-cards
              ${cardsShow && 'dominion-cards--active'}
          `}
            >
              <div className="pb4  mb2">
                <p className="white  f6  lh-copy">
                  Here you can download any of our previous prints. For future
                  prints, keep an eye on your email as we frequently update
                  progress on upcoming issues.
                </p>
              </div>

              <div className="flex  flex-wrap  pb3">
                {[...Array(samplesLength)].map((iteration, i) => (
                  <div key={iteration} className="col-24  col-8-md  ph3  pv2">
                    <CardPrint
                      i={i}
                      post={samples?.length && samples[i]}
                      handleClick={apply}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  if (!user?.isDominion) {
    return (
      <>
        <div className="pb3">
          <Heading
            /* Options */
            htmlEntity="h1"
            text="You are not currently in the Dominion"
            color="white"
            size="medium"
            truncate={null}
            /* Children */
            withLinkProps={null}
          />
        </div>
        <div className="pb3">
          <Button
            /* Options */
            type="primary"
            size="medium"
            text="Click here to join"
            color="white"
            fluid={false}
            icon={null}
            iconFloat={null}
            invert={false}
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
                scroll: false,
              },
            }}
          />
        </div>
      </>
    );
  }

  return false;
}
