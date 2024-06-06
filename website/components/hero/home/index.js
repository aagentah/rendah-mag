import Link from 'next/link';
import BlockContent from '@sanity/block-content-to-react';
import isObject from 'lodash/isObject';
import dynamic from 'next/dynamic';
import { Parallax } from 'react-scroll-parallax';

import Heading from '~/components/elements/heading';
import Button from '~/components/elements/button';
import Copy from '~/components/elements/copy';
import Image from '~/components/elements/image';
import { imageBuilder } from '~/lib/sanity/requests';
import { useApp } from '~/context-provider/app';
import { useUser } from '~/lib/hooks';

const IconArrowRight = dynamic(() =>
  import('~/components/elements/icon').then((m) => m.IconArrowRight)
);

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
  skeleton,
}) {
  const app = useApp();
  const [user] = useUser();

  const scale = app?.isRetina ? 2 : 1;
  let imageUrlWidth;
  let imageHeight = null;
  if (app.deviceSize === 'md') imageUrlWidth = 700;
  if (app.deviceSize === 'lg') imageUrlWidth = 1600;
  if (app.deviceSize === 'xl') imageUrlWidth = 1800;
  const heroButtonIcon = <IconArrowRight color="rendah-red" size={24} />;
  let heroTitle;
  let heroCopy;
  let linkProps;
  let heroButton;
  const ParallaxDiv = app.deviceSize === 'md' ? 'div' : Parallax;

  const buttonIconRed = <IconArrowRight color="#e9393f" size={16} />;

  const styles = {
    height: `${imageHeight}px`,
  };

  if (link) {
    linkProps = {
      type: 'next',
      href: `/${link}`,
      target: null,
      routerLink: Link,
      routerLinkProps: {
        as: `/${link}`,
        scroll: false,
      },
    };
  }

  const heroImage = (
    <Image
      /* Options */
      src={
        image &&
        imageBuilder
          .image(image)
          .width(imageUrlWidth * scale)
          .auto('format')
          .fit('clip')
          .url()
      }
      placeholder={
        image &&
        imageBuilder
          .image(image)
          .width(imageUrlWidth / 10)
          .auto('format')
          .fit('clip')
          .blur('20')
          .url()
      }
      alt={title}
      figcaption={null}
      height={imageHeight}
      width={null}
      customClass={null}
      priority={true}
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
        color="rendah-red"
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
        color="rendah-red"
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
        type="primary"
        size="medium"
        text={heroButtonText}
        color="rendah-red"
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
        {
          // {heroTitle && <div className="hero__title">{heroTitle}</div>}
          //   {heroCopy && <p className="hero__description">{heroCopy}</p>}
          // {heroButton && <div className="hero__button">{heroButton}</div>}
        }
      </div>

      {heroImage && <div className="hero__image">{heroImage}</div>}

      <p className="t-primary  f4  scroll-down  white">
        <span className="flex  justify-center">
          <svg
            fill="#ffffff"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z" />
          </svg>
        </span>
      </p>

      <div className="w-100  col-12-md  pa4  pa5-md  br4 fff">
        <div className="fff2">
          <p className="f5  f3-md  t-primary  lh-title  almost-white  tac  mb4">
            Rendah Mag is a creative UK-based outlet, primarily focused on
            exploring the nexus of experimental music, art, and technology.
          </p>
        </div>
      </div>

      {
        //   <div className="join-left  absolute  top  mt5  pr5">
        //   <ParallaxDiv speed={-8}>
        //     Exp
        //     <span className="join-right">
        //       lore our <br /> Magazine <br /> Subscription
        //     </span>
        //   </ParallaxDiv>
        // </div>
      }
    </article>
  );
}
