import React from 'react';
import Link from 'next/link';

/**
 * Determines what link type children should be wrapped in.
 */

export default function WithLink(props) {
  const { withLinkProps, children, ...newProps } = props;
  const base = newProps ? <div {...newProps}>{children}</div> : children;

  if (!withLinkProps) return base;

  const { type, href, target, routerLink, routerLinkProps } = withLinkProps;
  const RouterLink = routerLink;

  console.log('type', type, href);

  switch (type) {
    case 'next':
      return (
        <Link href={href} {...routerLinkProps} {...newProps}>
          <a {...newProps}>{children}</a>
        </Link>
      );
    case 'external':
      return (
        <a
          className="link"
          target={target || '_self'}
          href={href}
          {...newProps}
        >
          {children}
        </a>
      );
    case 'form':
      return (
        <button type="submit" {...newProps}>
          {children}
        </button>
      );
    case 'none':
      return base;
    default:
      return base;
  }
}
