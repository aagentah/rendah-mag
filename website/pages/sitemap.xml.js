import React from 'react';

import { getAllPostsTotal, getAllProductsTotal } from '~/lib/sanity/requests';

const sitemapXml = (allPosts, allProducts) => {
  const staticPages = [
    { name: 'cyphers', priority: '0.8' },
    { name: 'dominion', priority: '0.8' },
    { name: 'login', priority: '0.8' },
    { name: 'mixes', priority: '0.8' },
    { name: 'signup', priority: '0.8' },
    { name: 'store', priority: '0.8' },
    { name: 'team', priority: '0.8' },
    { name: 'category/interviews', priority: '0.9' },
    { name: 'category/insights', priority: '0.9' },
    { name: 'category/news', priority: '0.9' },
  ];

  const staticPagesXML = '';
  let postsXML = '';
  let productsXML = '';

  // Static
  staticPages.map((page) => {
    const url = `${process.env.SITE_URL}/${page.name}`;

    postsXML += `
      <url>
        <loc>${url}</loc>
        <priority>${page.priority}</priority>
      </url>`;

    return true;
  });

  // Posts
  allPosts.map((post) => {
    const url = `${process.env.SITE_URL}/article/${post.slug}`;

    postsXML += `
      <url>
        <loc>${url}</loc>
        <priority>0.50</priority>
      </url>`;

    return true;
  });

  // Products
  allProducts.map((product) => {
    const url = `${process.env.SITE_URL}/product/${product.slug}`;

    productsXML += `
      <url>
        <loc>${url}</loc>
        <priority>0.50</priority>
      </url>`;

    return true;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${process.env.SITE_URL}</loc>
        <priority>1.00</priority>
      </url>
      ${staticPagesXML}
      ${postsXML}
      ${productsXML}
    </urlset>`;
};

class Sitemap extends React.Component {
  static async getInitialProps({ res }) {
    const allPosts = await getAllPostsTotal();
    const allProducts = await getAllProductsTotal();

    res.setHeader('Content-Type', 'text/xml');
    res.write(sitemapXml(allPosts, allProducts));
    res.end();
  }
}

export default Sitemap;
