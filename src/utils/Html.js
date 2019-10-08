/* @flow */

import React from 'react';
import type { Element } from 'react';
import Helmet from 'react-helmet';
import serialize from 'serialize-javascript';
import _ from 'lodash';

import type { Store } from '../types';

type Props = {
  store: Store,
  noServerRender: boolean,
  htmlContent?: string,
};

const Html = ({ store, htmlContent, noServerRender }: Props): Element<'html'> => {
  // Should be declared after "renderToStaticMarkup()" of "../server.js" or it won't work
  const head = Helmet.renderStatic();
  const attrs = head.htmlAttributes.toComponent();
  const { lang, ...rest } = attrs || {};
  const assets = webpackIsomorphicTools.assets();

  return (
    <html {...rest} lang={lang || 'en'}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" />

        {head.meta.toComponent()}
        {head.title.toComponent()}
        {head.base.toComponent()}
        {head.link.toComponent()}

        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="theme-color" content="#ffffff" />

        {/* Styles will be presented in production with webpack extract text plugin */}
        {_.keys(assets.styles).map(style => (
          <link
            key={_.uniqueId()}
            href={assets.styles[style]}
            media="screen, projection"
            rel="stylesheet"
            type="text/css"
          />
        ))}
        {/* Styles will be presented in development mode */}
        {/* I put all of the styles here to smoothen the flick */}
        {_.keys(assets.styles).length === 0 ? null : null}

        {/* configure the client to load data on initial render if __DISABLE_SSR__ is set */}
        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: `window.__noServerRender__=${!!noServerRender};`,
          }}
        />
      </head>
      <body>
        <div
          id="react-view"
          // Rendering the route, which passed from server-side
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: htmlContent || '' }}
        />

        <script
          // Store the initial state into window
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: store && `window.__INITIAL_STATE__=${serialize(store.getState())};`,
          }}
        />
        {// Reverse the order of scripts for accessing vendor.js first
          _.keys(assets.javascript)
            .reverse()
            .map(script => (
              <script key={_.uniqueId()} src={assets.javascript[script]} />
            ))}

        {head.script.toComponent()}

        {/* Snipcart */}
        <script
          src="https://code.jquery.com/jquery-3.4.1.min.js"
          integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="
          crossorigin="anonymous"
        />
        <script
          src="https://cdn.snipcart.com/scripts/2.0/snipcart.js"
          data-api-key="MGM4ODQyYzAtOTMyZS00ZmJhLWI0NWUtZmRiNzAxMzMzYzI4NjM2OTY5NjI2MDMxMTAyODE2"
          data-autopop="false"
          id="snipcart"
        />
        <link
          href="https://cdn.snipcart.com/themes/2.0/base/snipcart.min.css"
          rel="stylesheet"
          type="text/css"
        />

        <Helmet>
          <script type="application/ld+json">
            {`
              {
              	"@context": "https://schema.org",
              	"@type": "Organization",
              	"name": "Rendah Mag",
              	"url": "https://www.rendahmag.com/",
              	"logo": "https://res.cloudinary.com/dzz8ji5lj/image/upload/v1547996619/brand/rendah-logo.png",
              	"address": {
              		"@type": "PostalAddress",
              		"addressCountry": "United Kingdom",
              		"addressLocality": "Manchester"
              	},
              	"founder": "Dan Jones",
              	"email": "mailto:info@rendahmag.com",
              	"sameAs": [
              		"https://www.facebook.com/rendahmag/",
              		"https://twitter.com/rendahmag",
              		"https://www.instagram.com/rendahmag/"
              	],
              	"potentialAction": {
              		"@type": "SearchAction",
              		"target": "https://www.rendahmag.com/search/{search_term}",
              		"query-input": "required name=search_term"
              	}
              }
            `}
          </script>
        </Helmet>
      </body>
    </html>
  );
};

Html.defaultProps = { htmlContent: '' };

export default Html;
