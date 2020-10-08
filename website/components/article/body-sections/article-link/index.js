import Link from 'next/link';

import { Button } from 'next-pattern-library';

export default function ArticleLink({ text, url }) {
  return (
    <div className="pv3  tal">
      <Button
        /* Options */
        type={'primary'}
        size={'small'}
        text={text}
        color={'black'}
        fluid={false}
        icon={null}
        iconFloat={null}
        inverted={false}
        loading={false}
        disabled={false}
        onClick={null}
        /* Children */
        withLinkProps={{
          type: 'external',
          href: url,
          target: '_blank',
          routerLink: null,
          routerLinkProps: null,
        }}
      />
    </div>
  );
}
