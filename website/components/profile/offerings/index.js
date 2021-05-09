import { useState, useEffect } from 'react';
import Router from 'next/router';
import { toast } from 'react-toastify';
import filter from 'lodash/filter';
import isEmpty from 'lodash/isEmpty';
import includes from 'lodash/includes';
import some from 'lodash/some';
import BlockContent from '@sanity/block-content-to-react';
import { Heading, Copy } from 'next-pattern-library';
import AudioEmbed from '~/components/article/body-sections/audio';

import CardCreations from '~/components/card/creations';

import { useUser } from '~/lib/hooks';
import { getAllOfferings } from '~/lib/sanity/requests';

export default function ProfileCreations({ ...props }) {
  const [user, { loading, mutate, error }] = useUser();
  const [offerings, setOfferings] = useState([]);
  const [otherPosts, setOtherPosts] = useState([]);
  const [currentAudioSelected, setCurrentAudioSelected] = useState(false);
  const handleAudioPlay = (playerRef) => setCurrentAudioSelected(playerRef);

  // Fetch orders
  useEffect(() => {
    const action = async () => {
      const data = await getAllOfferings();
      if (data) setOfferings(data);
    };

    action();
  }, [offerings?.length]);

  console.log('offerings', offerings);

  if (user?.isDominion && offerings?.length) {
    return (
      <section>
        <div className="pb2">
          <Heading
            /* Options */
            htmlEntity="h1"
            text="Offerings"
            color="black"
            size="medium"
            truncate={null}
            /* Children */
            withLinkProps={null}
          />
        </div>
        <div className="pb4  mb2">
          <p className="black  f6  lh-copy">
            Creations serves as our internal offering for additional exclusive
            content on the Dominion. The idea behind this is to share insights
            not only on music, but as a wider-appeal to the industry as a whole,
            including tutorials, technical interviews, branding tips, creative
            features, and much more!
          </p>
        </div>

        {offerings?.length ? (
          <>
            <div className="flex  flex-wrap">
              {offerings.map((offering, i) => (
                <div key={offering.slug} className="col-24  pb3">
                  <AudioEmbed
                    i={i}
                    title={offering?.title}
                    description={offering?.description}
                    url={offering?.url}
                    allowDownload={offering?.allowDownload}
                    handleAudioPlay={handleAudioPlay}
                    currentAudioSelected={currentAudioSelected}
                  />
                </div>
              ))}
            </div>
          </>
        ) : null}
      </section>
    );
  }

  return (
    <Heading
      /* Options */
      htmlEntity="h1"
      text="No results."
      color="black"
      size="medium"
      truncate={null}
      /* Children */
      withLinkProps={null}
    />
  );
}
