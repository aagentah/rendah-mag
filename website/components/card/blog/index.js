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
  const height = 240;
  const width = 240;
  const slug = product?.slug;

  // Prepare labels using the same classes as blog divisions.
  const labelClass =
    'inline text-xxs px-2 py-0.5 border border-neutral-400 text-neutral-400';
  const labels = [];
  if (product?.tag === 'Sold-out') {
    labels.push(
      <Label
        key="sold-out"
        customClass={labelClass}
        text="Sold-out"
        skeleton={!product}
      />
    );
  }
  if (product?.tag === 'Pre-order') {
    labels.push(
      <Label
        key="pre-order"
        customClass={labelClass}
        text="Pre-order"
        skeleton={!product}
      />
    );
  }

  return (
    <Link href={`/product/${slug}`} scroll={false}>
      <article
        className="
          grid grid-cols-1 md:grid-cols-12 gap-y-4
          overflow-hidden
          cursor-pointer
          border-b-4 border-neutral-700
        "
      >
        <div className="relative col-span-6">
          <LazyLoad once offset={250} height={height}>
            <ImageNew
              imageObject={product?.imageObject}
              height={height}
              width={width}
              className="object-cover h-[240px] brightness-75 shadow2 br3"
            />
          </LazyLoad>
        </div>

        <div className="flex flex-col justify-between p-4 col-span-6">
          <div>
            {labels.length > 0 && (
              <div className="flex flex-wrap gap-x-2 mb-2">{labels}</div>
            )}
            <Heading
              htmlEntity="h3"
              text={product?.title}
              customClass="text-sm text-neutral-300"
              skeleton={!product}
              withLinkProps={null}
            />
          </div>
          <div className="flex justify-start">
            <Button
              type="secondary"
              size="small"
              text="View product"
              customClass="text-sm text-neutral-300"
              fluid={false}
              icon={<IconArrowRight color="neutral-300" size={16} />}
              inverted={false}
              loading={false}
              disabled={false}
              skeleton={false}
              onClick={null}
              withLinkProps={null}
            />
          </div>
        </div>
      </article>
    </Link>
  );
}
