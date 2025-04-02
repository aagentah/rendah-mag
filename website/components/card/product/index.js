import Link from 'next/link';
import dynamic from 'next/dynamic';
import LazyLoad from 'react-lazyload';

import Heading from '~/components/elements/heading';
import Button from '~/components/elements/button';
import ImageNew from '~/components/elements/image-new';
import Label from '~/components/elements/label';

import { useApp } from '~/context-provider/app';

const IconArrowRight = dynamic(() =>
  import('~/components/elements/icon').then((m) => m.IconArrowRight)
);

export default function CardProduct({ product }) {
  const app = useApp();
  const height = app.deviceSize === 'md' ? 200 : 200;
  const width = 240;
  const slug = product?.slug;

  // Prepare labels with updated colours to match the blog card
  const labels = [];
  if (product?.tag === 'Sold-out') {
    labels.push(
      <Label
        key="sold-out"
        customClass="inline text-xxs px-2 py-0.5 border border-neutral-400 text-neutral-400 mb-4"
        text="Sold-out"
        color="white"
        backgroundColor=""
        skeleton={!product}
      />
    );
  }
  if (product?.tag === 'Pre-order') {
    labels.push(
      <Label
        key="pre-order"
        customClass="inline text-xxs px-2 py-0.5 border border-neutral-400 text-neutral-400 mb-4"
        text="Pre-order"
        color="white"
        backgroundColor=""
        skeleton={!product}
      />
    );
  }

  return (
    <Link href={`/product/${slug}`} scroll={false}>
      <article
        className="
          grid grid-cols-1 md:grid-cols-12 gap-y-4
          text-white
          overflow-hidden
          cursor-pointer
          border-b-4 border-neutral-700
        "
      >
        {/* Left Column: Image */}
        <div className="relative col-span-6">
          <LazyLoad once offset={250} height={height}>
            <ImageNew
              imageObject={product?.imageObject}
              height={height}
              width={width}
              className="object-cover brightness-75 shadow2 br3"
            />
          </LazyLoad>
        </div>

        {/* Right Column: Content */}
        <div className="flex flex-col justify-between p-4 col-span-6">
          <div className="mb-2">
            {labels.length > 0 && (
              <div className="flex flex-wrap gap-x-2 mb-2">{labels}</div>
            )}
            <Heading
              htmlEntity="h2"
              text={product?.title}
              color="neutral-400"
              size="small"
              truncate={null}
              skeleton={!product}
              withLinkProps={null} // Entire card is already linked
            />
          </div>
          <div className="flex start-end">
            <Button
              type="secondary"
              size="small"
              text="View"
              color="neutral-400"
              fluid={false}
              icon={<IconArrowRight color="neutral-400" size={16} />}
              inverted={false}
              loading={false}
              disabled={false}
              skeleton={false}
              onClick={null}
              withLinkProps={null} // Entire card is already linked
            />
          </div>
        </div>
      </article>
    </Link>
  );
}
