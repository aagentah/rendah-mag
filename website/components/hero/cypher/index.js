import BlockContent from '@sanity/block-content-to-react';
import isObject from 'lodash/isObject';
import dynamic from 'next/dynamic';

import Heading from '~/components/elements/heading';
import Button from '~/components/elements/button';
import Copy from '~/components/elements/copy';
import Image from '~/components/elements/image';

import { useApp } from '~/context-provider/app';

const IconArrowRight = dynamic(() =>
  import('~/components/elements/icon').then(m => m.IconArrowRight)
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
  skeleton
}) {
  const app = useApp();
  const scale = app?.isRetina ? 2 : 1;
  const imageUrlWidth = app?.deviceSize === 'md' ? 720 : 1080;
  const imageHeight = app?.deviceSize === 'md' ? 400 : 400;
  const heroButtonIcon = <IconArrowRight color="black" size={16} />;
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
