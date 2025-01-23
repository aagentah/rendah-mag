import { Parallax } from 'react-scroll-parallax';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Heading from '~/components/elements/heading';

import Button from '~/components/elements/button';
import Container from '~/components/layout/container';
import CardBlog from '~/components/card/blog';

import { getFeatured } from '~/lib/sanity/requests';
import { useApp } from '~/context-provider/app';

const IconArrowRight = dynamic(() =>
  import('~/components/elements/icon').then((m) => m.IconArrowRight)
);

const IconLock = dynamic(() =>
  import('~/components/elements/icon').then((m) => m.IconLock)
);

export default function Home({ siteConfig }) {
  const app = useApp();

  const [music, setMusic] = useState(null);
  const [musicLength, setMusicLength] = useState(12);

  useEffect(() => {
    const action = async () => {
      const musicRes = await getFeatured([1, 12]);
      console.log('musicRes', musicRes);

      setMusic(musicRes);
    };

    action();
  }, []);

  const buttonIcon = <IconArrowRight color="black" size={16} />;

  const ParallaxDiv = app.deviceSize === 'md' ? 'div' : Parallax;

  const categories = [
    { title: 'Music', slug: 'music' },
    { title: 'Art', slug: 'art' },
    { title: 'Technology', slug: 'technology' },
  ];

  console.log('music', music);

  return (
    <>
      <div className="bg-light-grey  pv6">
        <Container>
          <div className="dib  mb4">
            <Heading
              /* Options */
              htmlEntity="h2"
              text="Recent Features"
              color="rendah-red"
              size="medium"
              truncate={null}
              /* Children */
              withLinkProps={null}
            />
          </div>

          <div className="flex  flex-wrap">
            <div className="col-24">
              <div className="flex  flex-wrap  pb4">
                {[...Array(musicLength)].map((iteration, i) => (
                  <div key={iteration} className="col-24  col-6-md">
                    <div className="pa2">
                      <CardBlog
                        i={i}
                        post={music?.length && music[i]}
                        columnCount={4}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex  flex-wrap  justify-start  pb4  pt3">
                <p className="t-primary  bold  tac  black  f5">
                  See more in...
                </p>
              </div>

              <div className="flex  flex-wrap  justify-start">
                {categories.map((category) => (
                  <div className="pr3  pb3  pb0-md" key={category.slug}>
                    <Button
                      /* Options */
                      type="primary"
                      size="x-small"
                      text={category.title}
                      color="black"
                      fluid={false}
                      icon={category?.icon || null}
                      iconFloat={null}
                      inverted={true}
                      loading={false}
                      disabled={false}
                      skeleton={false}
                      onClick={null}
                      /* Children */
                      withLinkProps={{
                        type: 'next',
                        href: '/division/[slug]',
                        target: null,
                        routerLink: Link,
                        routerLinkProps: {
                          as: `/division/${category.slug}`,
                          scroll: false,
                        },
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
