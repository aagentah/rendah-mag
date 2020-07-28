import React from 'react';

import { getAllPosts, getAllProducts } from '../lib/sanity/requests';
import { SITE_URL } from '../constants';

const sitemapXml = (allPosts, allProducts) => {
  let postsXML = '';
  let productsXML = '';

  allPosts.map((post) => {
    const url = `${SITE_URL}/${post.slug}`;
    const date = Date.parse(post.date);

    postsXML += `
      <url>
        <loc>${url}</loc>
        <lastmod>${date}</lastmod>
        <priority>0.50</priority>
      </url>`;

      return true;
  });

  allProducts.map((product) => {
    const url = `${SITE_URL}/${product.slug}`;
    const date = Date.parse(product.date);

    productsXML += `
      <url>
        <loc>${url}</loc>
        <lastmod>${date}</lastmod>
        <priority>0.50</priority>
      </url>`;

      return true;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${SITE_URL}</loc>
        <lastmod>0</lastmod>
        <priority>1.00</priority>
      </url>
      ${postsXML}
      ${productsXML}
    </urlset>`;
};

class Sitemap extends React.Component {
  static async getInitialProps({ res }) {
    const allPosts = await getAllPosts();
    const allProducts = await getAllProducts();

    res.setHeader('Content-Type', 'text/xml');
    res.write(sitemapXml(allPosts, allProducts));
    res.end();
  }
}

export default Sitemap;