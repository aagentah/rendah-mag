import { useState, useEffect } from 'react';
import Router from 'next/router';
import { toast } from 'react-toastify';
import filter from 'lodash/filter';
import isEmpty from 'lodash/isEmpty';
import BlockContent from '@sanity/block-content-to-react';
import { Heading, Copy } from 'next-pattern-library';

import { useUser } from '~/lib/hooks';
import { getDominionPipeline } from '~/lib/sanity/requests';

export default function ProfileOrders() {
  const [user, { loading, mutate, error }] = useUser();
  const [pipelineItems, setPipelineItems] = useState();

  // Fetch orders
  useEffect(() => {
    const action = async () => {
      const dominionPipeline = await getDominionPipeline();
      if (dominionPipeline) setPipelineItems(dominionPipeline);
    };

    action();
  }, []);

  if (user?.isDominion && pipelineItems?.items?.length) {
    return (
      <section>
        <div className="pb2">
          <Heading
            /* Options */
            htmlEntity="h1"
            text="Pipeline."
            color="black"
            size="medium"
            truncate={null}
            /* Children */
            withLinkProps={null}
          />
        </div>
        <div className="pb4  mb2">
          <p className="black  f6  lh-copy">
            Here we document progress in upcoming features and services. If
            you&apos;d like something as part of your Dominion subscription,{' '}
            <a className="underline" href="mailto:info@rendahmag.com">
              reach out to us!
            </a>
          </p>
        </div>

        <div className="ccc">
          {pipelineItems.items.map((item, i) => (
            <div key={i._key} className="timeline-block timeline-block-right">
              {item?.completed && (
                <div className="marker active">
                  <i className="fa fa-check active" aria-hidden="true" />
                </div>
              )}

              {!item?.completed && (
                <div className="marker">
                  <i className="fa fa-check" aria-hidden="true" />
                </div>
              )}

              <div className="timeline-content">
                {item?.title && (
                  <div className="pb2">
                    <Heading
                      /* Options */
                      htmlEntity="h2"
                      text={item.title}
                      color="black"
                      size="small"
                      truncate={null}
                      /* Children */
                      withLinkProps={null}
                    />
                  </div>
                )}
                {item?.description?.length && (
                  <div className="rich-text">
                    <BlockContent blocks={item.description} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
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
