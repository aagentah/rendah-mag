import React from 'react';

import { getAllPosts, getAllProducts } from '~/lib/sanity/requests';


const sitemapXml = (allPosts, allProducts) => {
  let postsXML = '';
  let productsXML = '';

  // Posts
  allPosts.map((post) => {
    const url = `${process.env.SITE_URL}/article/${post.slug}`;
    const date = Date.parse(post.date);

    postsXML += `
      <url>
        <loc>${url}</loc>
        <lastmod>${date}</lastmod>
        <priority>0.50</priority>
      </url>`;

    return true;
  });

  // Products
  allProducts.map((product) => {
    const url = `${process.env.SITE_URL}/product/${product.slug}`;
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
        <loc>${process.env.SITE_URL}</loc>
        <lastmod>0</lastmod>
        <priority>1.00</priority>
      </url>
      <url>
        <loc>${process.env.SITE_URL}/category/interviews</loc>
        <priority>0.80</priority>
      </url>
      <url>
        <loc>${process.env.SITE_URL}/category/insights</loc>
        <priority>0.80</priority>
      </url>
      <url>
        <loc>${process.env.SITE_URL}/category/news</loc>
        <priority>0.80</priority>
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
