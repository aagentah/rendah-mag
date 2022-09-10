// import Link from 'next/link';
// import { useState } from 'react';
// // import { Parallax } from 'react-scroll-parallax';
//
// import { Heading, Copy, Image, Button, Icon } from 'next-pattern-library';
//
// import Modal from '~/components/modal';
// import Hero from '~/base-components/hero';
// import { imageBuilder } from '~/lib/sanity/requests';
// import { useApp } from '~/context-provider/app';
//
// export default function HeroCypher({ cypher }) {
//   const app = useApp();
//   const buttonIcon = <Icon icon={['fas', 'arrow-right']} />;
//   const [modalActive, setModalActive] = useState(false);
//
//   if (!app.deviceSize) return null;
//   const scale = app.isRetina ? 2 : 1;
//   let imageUrlWidth;
//   const imageHeight = 500;
//
//   if (app.deviceSize === 'md') imageUrlWidth = 700;
//   if (app.deviceSize === 'lg') imageUrlWidth = 1600;
//   if (app.deviceSize === 'xl') imageUrlWidth = 1800;
//
//   const heroImage = (
//     <Image
//       /* Options */
//       src="/images/cypher-youtube.jpg"
//       placeholder={null}
//       alt="This is the alt text."
//       figcaption={null}
//       height={500}
//       width={null}
//       customClass={null}
//       skeleton={false}
//       onClick={null}
//       /* Children */
//       withLinkProps={null}
//     />
//   );
//
//   const heroHeading = (
//     <Heading
//       /* Options */
//       htmlEntity="h1"
//       text="Rendah Mag Cyphers"
//       color="white"
//       size="x-large"
//       truncate={null}
//       /* Children */
//       withLinkProps={null}
//     />
//   );
//   //
//   // const heroButton = (
//   //   <Button
//   //     /* Options */
//   //     type="secondary"
//   //     size="medium"
//   //     text="Enter this month's Cypher"
//   //     color="white"
//   //     fluid={false}
//   //     icon={buttonIcon}
//   //     iconFloat={null}
//   //     inverted={false}
//   //     loading={false}
//   //     disabled={false}
//   //    skeleton={false}
//   //     onClick={() => setModalActive(!modalActive)}
//   //     /* Children */
//   //     withLinkProps={null}
//   //   />
//   // );
//
//   const heroButton = null;
//
//   return (
//     <>
//       <Modal
//         /* Options */
//         size="small"
//         active={modalActive}
//       >
//         <div className="pb2">
//           <Heading
//             /* Options */
//             htmlEntity="h3"
//             text="Login or Sign up to enter this month's Cypher!"
//             color="black"
//             size="large"
//             truncate={0}
//             onClick={null}
//             /* Children */
//             withLinkProps={null}
//           />
//         </div>
//         <div className="flex  flex-wrap  pb2">
//           <div className="col-24  col-8-md  flex  justify-center  justify-start-md  align-center">
//             <Button
//               /* Options */
//               type="primary"
//               size="medium"
//               text="Login"
//               color="black"
//               fluid={false}
//               icon={null}
//               iconFloat={null}
//               inverted={false}
//               loading={false}
//               disabled={false}
//               skeleton={false}
//               onClick={null}
//               /* Children */
//               withLinkProps={{
//                 type: 'next',
//                 href: '/login',
//                 target: null,
//                 routerLink: Link,
//                 routerLinkProps: {
//                   scroll: false,
//                 },
//               }}
//             />
//           </div>
//           <div className="col-24  col-8-md  flex  justify-center  justify-start-md  align-center">
//             <Button
//               /* Options */
//               type="primary"
//               size="medium"
//               text="Sign Up"
//               color="black"
//               fluid={false}
//               icon={null}
//               iconFloat={null}
//               inverted={false}
//               loading={false}
//               disabled={false}
//               skeleton={false}
//               onClick={null}
//               /* Children */
//               withLinkProps={{
//                 type: 'next',
//                 href: '/signup',
//                 target: null,
//                 routerLink: Link,
//                 routerLinkProps: {
//                   scroll: false,
//                 },
//               }}
//             />
//           </div>
//           <div className="col-24  col-8-md  flex  justify-center  justify-start-md  align-center  pl2">
//             <Button
//               /* Options */
//               type="secondary"
//               size="medium"
//               text="Cancel"
//               color="black"
//               fluid={false}
//               icon={null}
//               iconFloat={null}
//               inverted={false}
//               loading={false}
//               disabled={false}
//               onClick={() => {
//                 setModalActive(!modalActive);
//               }}
//               /* Children */
//               withLinkProps={null}
//             />
//           </div>
//         </div>
//       </Modal>
//
//       {
//         // <Parallax className="z1  nt3" y={['-50px', '50px']} tagOuter="figure">
//       }
//       <div className="hero--cypher  hero--darken-all">
//         {
//           // <Hero
//           //   /* Options */
//           //   height={500}
//           //   /* Children */
//           //   image={heroImage}
//           //   title={heroHeading}
//           //   description={null}
//           //   button={cypher ? heroButton : null}
//           // />
//         }
//
//         <Hero
//           image={post?.coverImage}
//           title={post?.title}
//           description={null}
//           heroButtonText={null}
//           link={`/article/${post?.slug}`}
//           marginTop={0}
//           marginBottom={0}
//           modifier={null}
//           skeleton={false}
//         />
//       </div>
//       {
//         //       </Parallax>
//       }
//     </>
//   );
// }

import BlockContent from '@sanity/block-content-to-react';
import isObject from 'lodash/isObject';

import Heading from '~/components/elements/heading';
import Button from '~/components/elements/button';
import Copy from '~/components/elements/copy';
import Icon from '~/components/elements/icon';
import Image from '~/components/elements/image';
import { useApp } from '~/context-provider/app';

/**
 * @param {string} image [required]
 * @param {string} title [required]
 * @param {string} description
 * @param {string} heroButtonText
 * @param {string} link
 * @param {string} marginTop [required]
 * @param {string} marginBottom [required]
 * @param {string} modifier
 * @param {string} skeleton [required]
 * */

export default function HeroDefault({
  image,
  title,
  description,
  heroButtonText,
  link,
  marginTop,
  marginBottom,
  modifier,
  //
  skeleton
}) {
  const app = useApp();
  const scale = app?.isRetina ? 2 : 1;
  const imageUrlWidth = app?.deviceSize === 'md' ? 720 : 1080;
  const imageHeight = app?.deviceSize === 'md' ? 400 : 400;
  const heroButtonIcon = <Icon icon={['fa', 'arrow-right']} size="3x" />;
  let heroTitle;
  let heroCopy;
  let linkProps;
  let heroButton;

  const styles = {
    height: `${imageHeight}px`
  };

  if (link) {
    linkProps = {
      type: 'external',
      href: link
    };
  }

  const heroImage = (
    <Image
      /* Options */
      src={image && image}
      placeholder={null}
      alt={title}
      figcaption={null}
      height={imageHeight}
      width={null}
      customClass={null}
      skeleton={skeleton}
      onClick={null}
      /* Children */
      withLinkProps={linkProps}
    />
  );

  if (title) {
    heroTitle = (
      <Heading
        /* Options */
        htmlEntity="h2"
        text={title}
        color="white"
        size="x-large"
        truncate={null}
        skeleton={skeleton}
        /* Children */
        withLinkProps={linkProps}
      />
    );
  }

  if (description) {
    heroCopy = isObject(description) ? (
      <BlockContent blocks={description} />
    ) : (
      <Copy
        /* Options */
        text={description || ''}
        color="black"
        size="medium"
        truncate={null}
        skeleton={skeleton}
      />
    );
  }

  if (heroButtonText && linkProps) {
    heroButton = (
      <Button
        /* Options */
        type="secondary"
        size="small"
        text={heroButtonText}
        color="black"
        fluid={false}
        icon={heroButtonIcon}
        iconFloat={null}
        inverted={false}
        loading={false}
        disabled={false}
        skeleton={skeleton}
        onClick={null}
        /* Children */
        withLinkProps={linkProps}
      />
    );
  }

  return (
    <article
      className={`
        hero
        ${modifier && `hero--${modifier}`}
        mt${marginTop}
        mb${marginBottom}
      `}
      style={styles}
    >
      <div className="hero__dialog">
        {heroTitle && <div className="hero__title">{heroTitle}</div>}
        {heroCopy && <p className="hero__description">{heroCopy}</p>}
        {heroButton && <div className="hero__button">{heroButton}</div>}
      </div>

      {heroImage && <div className="hero__image">{heroImage}</div>}
    </article>
  );
}
