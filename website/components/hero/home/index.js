import Link from 'next/link';
import BlockContent from '@sanity/block-content-to-react';
import isObject from 'lodash/isObject';
import dynamic from 'next/dynamic';
import { Parallax } from 'react-scroll-parallax';

import ImageNew from '~/components/elements/image-new';
import { imageBuilder } from '~/lib/sanity/requests';
import { useApp } from '~/context-provider/app';
import { useUser } from '~/lib/hooks';

const IconArrowRight = dynamic(() =>
  import('~/components/elements/icon').then((m) => m.IconArrowRight)
);

/**
 * Props:
 * @param {object} imageObject [required]
 * @param {string} title [required]
 * @param {string|object} description
 * @param {string} heroButtonText
 * @param {string} link
 * @param {number|string} marginTop [required]
 * @param {number|string} marginBottom [required]
 * @param {string} modifier
 * @param {boolean} skeleton [required]
 */
export default function HeroDefault({
  imageObject,
  title,
  description,
  heroButtonText,
  link,
  marginTop,
  marginBottom,
  modifier,
  skeleton,
}) {
  const app = useApp();
  const [user] = useUser();

  // Use retina scale if needed
  const scale = app?.isRetina ? 2 : 1;
  let imageUrlWidth;
  let imageHeight = null;
  if (app.deviceSize === 'md') imageUrlWidth = 700;
  if (app.deviceSize === 'lg') imageUrlWidth = 1600;
  if (app.deviceSize === 'xl') imageUrlWidth = 1800;

  const heroButtonIcon = <IconArrowRight color="#e9393f" size={24} />;
  let heroTitle;
  let heroCopy;
  let linkProps;
  let heroButton;
  const ParallaxDiv = app.deviceSize === 'md' ? 'div' : Parallax;

  // Define link properties if a link is provided.
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

  // Create the hero image element.
  const heroImage = <ImageNew imageObject={imageObject} />;

  // Render the title using an h2 with Tailwind classes.
  if (title) {
    heroTitle = (
      <h2
        className={`text-4xl md:text-5xl font-bold text-red-600 ${
          skeleton ? 'bg-gray-200 animate-pulse' : ''
        }`}
      >
        {title}
      </h2>
    );
  }

  // Render the description. If it's an object, use BlockContent.
  if (description) {
    heroCopy = isObject(description) ? (
      <BlockContent blocks={description} />
    ) : (
      <p
        className={`mt-4 text-lg text-red-600 ${
          skeleton ? 'bg-gray-200 animate-pulse' : ''
        }`}
      >
        {description}
      </p>
    );
  }

  // Render the hero button if text and linkProps are provided.
  if (heroButtonText && linkProps) {
    heroButton = (
      <Link {...linkProps} legacyBehavior>
        <a
          className={`inline-flex items-center mt-6 px-6 py-3 border border-red-600 text-red-600 font-medium hover:bg-red-600 hover:text-white transition-colors ${
            skeleton ? 'bg-gray-200 animate-pulse' : ''
          }`}
        >
          {heroButtonText}
          <span className="ml-2">{heroButtonIcon}</span>
        </a>
      </Link>
    );
  }

  // Construct dynamic margin classes (assuming marginTop/marginBottom are valid Tailwind spacing numbers)
  const marginTopClass = `mt-${marginTop}`;
  const marginBottomClass = `mb-${marginBottom}`;

  // The overall article container.
  return (
    <article
    // className={`relative overflow-hidden ${
    //   modifier ? `hero--${modifier}` : ''
    // } ${marginTopClass} ${marginBottomClass}`}
    // style={{ height: imageHeight ? `${imageHeight}px` : 'auto' }}
    >
      {/* Dialog overlay */}
      {/* <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
        {heroTitle && <div>{heroTitle}</div>}
        {heroCopy && <div>{heroCopy}</div>}
        {heroButton && <div>{heroButton}</div>}
      </div> */}

      {/* Hero Image */}
      {heroImage && <div className="w-full h-full">{heroImage}</div>}

      {/* Scroll Down Indicator */}
      {/* <p className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <span className="flex justify-center">
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
      </p> */}

      {/* Footer Text Block */}
      {/* <div className="w-full md:w-1/2 p-4 md:p-5 rounded mx-auto">
        <div>
          <p className="text-base md:text-xl text-gray-200 leading-tight text-center mb-4">
            Rendah Mag is a creative UK-based outlet, primarily focused on
            exploring the nexus of experimental music, art, and technology.
          </p>
        </div>
      </div> */}
    </article>
  );
}
