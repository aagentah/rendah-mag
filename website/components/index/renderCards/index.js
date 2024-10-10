import { Parallax } from 'react-scroll-parallax';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Heading from '~/components/elements/heading';

import Button from '~/components/elements/button';
import Container from '~/components/layout/container';
import CardBlog from '~/components/card/blog';

import { getDivision } from '~/lib/sanity/requests';
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
  const [art, setArt] = useState(null);
  const [technology, setTechnology] = useState(null);
  //   const [insights, setInsights] = useState(null);
  //   const [premieres, setPremieres] = useState(null);
  //   const [guestMixes, setGuestMixes] = useState(null);

  const [musicLength, setInterviewsLength] = useState(4);
  const [artLength, setNewsLength] = useState(4);
  const [technologyLength, setTechnologyLength] = useState(4);
  // const [insightsLength, setInsightsLength] = useState(6);
  // const [premieresLength, setPremieresLength] = useState(4);
  // const [guestMixesLength, setGuestMixesLength] = useState(4);

  useEffect(() => {
    const action = async () => {
      const musicRes = await getDivision('music', [1, 4], null, ['premieres']);
      // const premiereRes = await getDivision('music', [1, 3], 'premieres');
      // Assuming both `musicRes` and `premiereRes` have a "posts" array
      // console.log('musicRes', musicRes);
      // console.log('premiereRes', premiereRes);
      // const combinedPosts = {
      //   posts: musicRes.posts
      //     .concat(premiereRes.posts)
      //     .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)),
      // }; // Concat and sort by publishedAt

      // console.log('combinedPosts', combinedPosts);
      const artRes = await getDivision('art', [1, 4]);
      const technologyRes = await getDivision('technology', [1, 4]);
      // const insightsRes = await getCategory('insights', [1, 6]);
      // const premieresRes = await getCategory('premieres', [1, 4]);
      // const guestMixesRes = await getCategory('guest-mix', [1, 4]);

      setMusic(musicRes);
      setArt(artRes);
      setTechnology(technologyRes);
      // setInsights(insightsRes);
      // setPremieres(premieresRes);
      // setGuestMixes(guestMixesRes);
    };

    action();
  }, []);

  const buttonIcon = <IconArrowRight color="black" size={16} />;

  const ParallaxDiv = app.deviceSize === 'md' ? 'div' : Parallax;

  const musicCategories = [
    { title: 'Interviews', slug: 'interviews' },
    { title: 'Insights', slug: 'insights' },
    { title: 'News', slug: 'news' },
    { title: 'Premieres', slug: 'premieres' },
    { title: 'Guest Mixes', slug: 'guest-mix' },
    {
      title: 'Exclusive',
      slug: 'dominion-exclusive',
      icon: <IconLock color="#000000" size={12} />,
    },
  ];

  const artCategories = [
    { title: 'Interviews', slug: 'interviews' },
    { title: 'Insights', slug: 'insights' },
    { title: 'News', slug: 'news' },
    {
      title: 'Exclusive',
      slug: 'dominion-exclusive',
      icon: <IconLock color="#000000" size={12} />,
    },
  ];

  const technologyCategories = [
    { title: 'Interviews', slug: 'interviews' },
    { title: 'Insights', slug: 'insights' },
    { title: 'News', slug: 'news' },
    {
      title: 'Exclusive',
      slug: 'dominion-exclusive',
      icon: <IconLock color="#ffffff" size={12} />,
    },
  ];

  return (
    <>
      <div className="bg-light-grey  pv6">
        <Container>
          <div className="dib  mb4">
            <Heading
              /* Options */
              htmlEntity="h2"
              text="Latest in Music"
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
                        post={music?.posts && music?.posts[i]}
                        columnCount={4}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex  flex-wrap  justify-start  pb4  pt3">
                <p className="t-primary  bold  tac  black  f5">
                  Find more in Music...
                </p>
              </div>

              <div className="flex  flex-wrap  justify-start">
                <div className="pr3  pb3  pb0-md">
                  <Button
                    /* Options */
                    type="primary"
                    size="x-small"
                    text="All Music"
                    color="black"
                    fluid={false}
                    icon={null}
                    iconFloat={null}
                    inverted={true}
                    loading={false}
                    disabled={false}
                    skeleton={false}
                    onClick={null}
                    /* Children */
                    withLinkProps={{
                      type: 'next',
                      href: '/division/music',
                      target: null,
                      routerLink: Link,
                      routerLinkProps: {
                        as: `/division/music`,
                        scroll: false,
                      },
                    }}
                  />
                </div>

                {musicCategories.map((category) => (
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
                        href: '/category/[slug]?division=music',
                        target: null,
                        routerLink: Link,
                        routerLinkProps: {
                          as: `/category/${category.slug}?division=music`,
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

      <div className="pv6">
        <Container>
          <div className="dib  mb4">
            <Heading
              /* Options */
              htmlEntity="h2"
              text="Latest in Art"
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
                {[...Array(artLength)].map((iteration, i) => (
                  <div key={iteration} className="col-24  col-6-md">
                    <div className="pa2">
                      <CardBlog
                        i={i}
                        post={art?.posts && art?.posts[i]}
                        columnCount={4}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex  flex-wrap  justify-start  pb4  pt3">
                <p className="t-primary  bold  tac  black  f5">
                  Find more in Art...
                </p>
              </div>
              <div className="flex  flex-wrap  justify-start">
                <div className="pr3  pb3  pb0-md">
                  <Button
                    /* Options */
                    type="primary"
                    size="x-small"
                    text="All Art"
                    color="black"
                    fluid={false}
                    icon={null}
                    iconFloat={null}
                    inverted={true}
                    loading={false}
                    disabled={false}
                    skeleton={false}
                    onClick={null}
                    /* Children */
                    withLinkProps={{
                      type: 'next',
                      href: '/division/art',
                      target: null,
                      routerLink: Link,
                      routerLinkProps: {
                        as: `/division/art`,
                        scroll: false,
                      },
                    }}
                  />
                </div>
                {artCategories.map((category) => (
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
                        href: '/category/[slug]?division=art',
                        target: null,
                        routerLink: Link,
                        routerLinkProps: {
                          as: `/category/${category.slug}?division=art`,
                          scroll: false,
                        },
                      }}
                    />
                  </div>
                ))}
                {
                  //   <div className="ph2  pb3  pb0-md">
                  //   <Button
                  //     /* Options */
                  //     type="primary"
                  //     size="x-small"
                  //     text="Gallery"
                  //     color="rendah-red"
                  //     fluid={false}
                  //     icon={null}
                  //     iconFloat={null}
                  //     inverted={false}
                  //     loading={false}
                  //     disabled={false}
                  //     skeleton={false}
                  //     onClick={null}
                  //     /* Children */
                  //     withLinkProps={{
                  //       type: 'next',
                  //       href: '/gallery',
                  //       target: null,
                  //       routerLink: Link,
                  //       routerLinkProps: {
                  //         as: `/gallery`,
                  //         scroll: false,
                  //       },
                  //     }}
                  //   />
                  // </div>
                }
              </div>
            </div>
          </div>
        </Container>
      </div>

      <div className="bg-creations-black  pv6">
        <Container>
          <div className="dib  mb4">
            <Heading
              /* Options */
              htmlEntity="h2"
              text="Latest in Technology"
              color="white"
              size="medium"
              truncate={null}
              /* Children */
              withLinkProps={null}
            />
          </div>

          <div className="flex  flex-wrap">
            <div className="col-24">
              <div className="flex  flex-wrap  pb4">
                {[...Array(technologyLength)].map((iteration, i) => (
                  <div key={iteration} className="col-24  col-6-md">
                    <div className="pa2">
                      <CardBlog
                        i={i}
                        post={technology?.posts && technology?.posts[i]}
                        columnCount={4}
                        inverted
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex  flex-wrap  justify-start  pb4  pt3">
                <p className="t-primary  bold  tac  white  f5">
                  Find more in Technology...
                </p>
              </div>
              <div className="flex  flex-wrap  justify-start">
                <div className="pr3  pb3  pb0-md">
                  <Button
                    /* Options */
                    type="primary"
                    size="x-small"
                    text="All Technology"
                    color="white"
                    fluid={false}
                    icon={null}
                    iconFloat={null}
                    inverted={true}
                    loading={false}
                    disabled={false}
                    skeleton={false}
                    onClick={null}
                    /* Children */
                    withLinkProps={{
                      type: 'next',
                      href: '/division/technology',
                      target: null,
                      routerLink: Link,
                      routerLinkProps: {
                        as: `/division/technology`,
                        scroll: false,
                      },
                    }}
                  />
                </div>
                {technologyCategories.map((category) => (
                  <div className="pr3  pb3  pb0-md" key={category.slug}>
                    <Button
                      /* Options */
                      type="primary"
                      size="x-small"
                      text={category.title}
                      color="white"
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
                        href: '/category/[slug]?division=technology',
                        target: null,
                        routerLink: Link,
                        routerLinkProps: {
                          as: `/category/${category.slug}?division=technology`,
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

      {
        //   <Container>
        //   <div className="bg-black  pa2  dib  mb4">
        //     <Heading
        //       /* Options */
        //       htmlEntity="h2"
        //       text="Premieres"
        //       color="white"
        //       size="small"
        //       truncate={null}
        //       /* Children */
        //       withLinkProps={null}
        //     />
        //   </div>
        //   <div className="flex  flex-wrap">
        //     <div className="col-24">
        //       <section className="pb5">
        //         <div className="flex  flex-wrap">
        //           {[...Array(premieresLength)].map((iteration, i) => (
        //             <div key={iteration} className="col-24  col-6-md">
        //               <div className="pa2">
        //                 <CardBlog
        //                   i={i}
        //                   post={premieres?.articles && premieres?.articles[i]}
        //                   columnCount={4}
        //                 />
        //               </div>
        //             </div>
        //           ))}
        //         </div>
        //         <div className="flex  justify-end  pr2">
        //           <Button
        //             /* Options */
        //             type="secondary"
        //             size="medium"
        //             text="All Premieres"
        //             color="black"
        //             fluid={false}
        //             icon={buttonIcon}
        //             iconFloat={null}
        //             inverted={false}
        //             loading={false}
        //             disabled={false}
        //             skeleton={false}
        //             onClick={null}
        //             /* Children */
        //             withLinkProps={{
        //               type: 'next',
        //               href: '/category/[slug]',
        //               target: null,
        //               routerLink: Link,
        //               routerLinkProps: {
        //                 as: `/category/premieres`,
        //                 scroll: false,
        //               },
        //             }}
        //           />
        //         </div>
        //       </section>
        //     </div>
        //   </div>
        // </Container>
        // <div className="bg-light-grey  pv5  mv4">
        //   <Container>
        //     <div className="bg-black  pa2  dib  mb4">
        //       <Heading
        //         /* Options */
        //         htmlEntity="h2"
        //         text="News & Insights"
        //         color="white"
        //         size="small"
        //         truncate={null}
        //         /* Children */
        //         withLinkProps={null}
        //       />
        //     </div>
        //     <div className="flex  flex-wrap">
        //       <div className="col-24  col-12-md">
        //         <section className="pb5">
        //           <div className="flex  flex-wrap">
        //             {[...Array(artLength)].map((iteration, i) => (
        //               <div key={iteration} className="col-24  col-12-md">
        //                 <div className="pa2">
        //                   <CardBlog
        //                     i={i}
        //                     post={art?.articles && art?.articles[i]}
        //                     columnCount={4}
        //                   />
        //                 </div>
        //               </div>
        //             ))}
        //           </div>
        //           <div className="flex  justify-end  pr2">
        //             <Button
        //               /* Options */
        //               type="secondary"
        //               size="medium"
        //               text="All News"
        //               color="black"
        //               fluid={false}
        //               icon={buttonIcon}
        //               iconFloat={null}
        //               inverted={false}
        //               loading={false}
        //               disabled={false}
        //               skeleton={false}
        //               onClick={null}
        //               /* Children */
        //               withLinkProps={{
        //                 type: 'next',
        //                 href: '/category/[slug]',
        //                 target: null,
        //                 routerLink: Link,
        //                 routerLinkProps: {
        //                   as: `/category/art`,
        //                   scroll: false,
        //                 },
        //               }}
        //             />
        //           </div>
        //         </section>
        //       </div>
        //       <div className="col-24  col-12-md">
        //         <section className="pb5">
        //           <div className="flex  flex-wrap">
        //             {[...Array(insightsLength)].map((iteration, i) => (
        //               <div key={iteration} className="col-24  col-12-md">
        //                 <div className="pa2">
        //                   <CardBlog
        //                     i={i}
        //                     post={insights?.articles && insights?.articles[i]}
        //                     columnCount={4}
        //                   />
        //                 </div>
        //               </div>
        //             ))}
        //           </div>
        //           <div className="flex  justify-end  pr2">
        //             <Button
        //               /* Options */
        //               type="secondary"
        //               size="medium"
        //               text="All Insights"
        //               color="black"
        //               fluid={false}
        //               icon={buttonIcon}
        //               iconFloat={null}
        //               inverted={false}
        //               loading={false}
        //               disabled={false}
        //               skeleton={false}
        //               onClick={null}
        //               /* Children */
        //               withLinkProps={{
        //                 type: 'next',
        //                 href: '/category/[slug]',
        //                 target: null,
        //                 routerLink: Link,
        //                 routerLinkProps: {
        //                   as: `/category/insights`,
        //                   scroll: false,
        //                 },
        //               }}
        //             />
        //           </div>
        //         </section>
        //       </div>
        //     </div>
        //   </Container>
        // </div>
        // <Container>
        //   <div className="bg-black  pa2  dib  mb4  mt4">
        //     <Heading
        //       /* Options */
        //       htmlEntity="h2"
        //       text="Guest Mixes"
        //       color="white"
        //       size="small"
        //       truncate={null}
        //       /* Children */
        //       withLinkProps={null}
        //     />
        //   </div>
        //   <div className="flex  flex-wrap">
        //     <div className="col-24">
        //       <section className="pb5">
        //         <div className="flex  flex-wrap">
        //           {[...Array(guestMixesLength)].map((iteration, i) => (
        //             <div key={iteration} className="col-24  col-6-md">
        //               <div className="pa2">
        //                 <CardBlog
        //                   i={i}
        //                   post={guestMixes?.articles && guestMixes?.articles[i]}
        //                   columnCount={4}
        //                 />
        //               </div>
        //             </div>
        //           ))}
        //         </div>
        //         <div className="flex  justify-end  pr2">
        //           <Button
        //             /* Options */
        //             type="secondary"
        //             size="medium"
        //             text="All Guest Mixes"
        //             color="black"
        //             fluid={false}
        //             icon={buttonIcon}
        //             iconFloat={null}
        //             inverted={false}
        //             loading={false}
        //             disabled={false}
        //             skeleton={false}
        //             onClick={null}
        //             /* Children */
        //             withLinkProps={{
        //               type: 'next',
        //               href: '/category/[slug]',
        //               target: null,
        //               routerLink: Link,
        //               routerLinkProps: {
        //                 as: `/category/guest-mix`,
        //                 scroll: false,
        //               },
        //             }}
        //           />
        //         </div>
        //       </section>
        //     </div>
        //   </div>
        // </Container>
      }
    </>
  );
}
