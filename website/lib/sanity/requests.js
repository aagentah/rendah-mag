import sanityImage from '@sanity/image-url';
import client, { previewClient } from './config';

const getUniquePosts = (posts) => {
  const slugs = new Set();
  return posts.filter((post) => {
    if (slugs.has(post.slug)) {
      return false;
    }
    slugs.add(post.slug);
    return true;
  });
};

const postFields = `
  name,
  title,
  publishedAt,
  description,
  'slug': slug.current,
  'coverImage': image.asset->url,
  'author': author->{name, 'picture': picture.asset->url},
`;

const productFields = `
  name,
  title,
  price,
  excerpt,
  'slug': slug.current,
  'coverImage': coverImage.asset->url,
`;

const getClient = (preview) => (preview ? previewClient : client);

export const imageBuilder = sanityImage(client);

export async function getSiteConfig() {
  const data = await client.fetch('*[_type == "siteSettings"] [0] { ..., }');
  return data;
}

export async function getPreviewPostBySlug(slug) {
  const data = await getClient(true).fetch(
    `*[_type == "post" && slug.current == $slug] | order(date desc){
      ${postFields}
      content
    }`,
    { slug }
  );
  return data[0];
}

export async function getAllPostsWithSlug() {
  const data = await client.fetch(
    '*[_type == "post"]{ \'slug\': slug.current }'
  );
  return data;
}

export async function getPostWithSearch(slug) {
  const data = await client.fetch(
    `*[_type == "post" && title match $slug || _type == "post" && excerpt match $slug]{
      ${postFields}
     }`,
    { slug }
  );
  return data;
}

export async function getLatestInterviews(preview) {
  const results = await getClient(preview)
    .fetch(`*[_type == "category" && slug.current == "interviews"] [0] {
          "articles": *[_type == "post" && references(^._id)] | order(date desc, _updatedAt desc) [0..3] {
            ${postFields}
            }
          }`);
  return getUniquePosts(results.articles);
}

export async function getAllPosts(preview) {
  const results = await getClient(preview)
    .fetch(`*[_type == "post"] | order(date desc, _updatedAt desc) [0..15] {
      ${postFields}
    }`);
  return getUniquePosts(results);
}

export async function getAllProducts(preview) {
  const results = await getClient(preview)
    .fetch(`*[_type == "product"] | order(date desc, _updatedAt desc){
      ${productFields}
    }`);
  return getUniquePosts(results);
}

export async function getPostAndMore(slug, preview) {
  const curClient = getClient(preview);
  const [post, morePosts] = await Promise.all([
    curClient
      .fetch(
        `*[_type == "post" && slug.current == $slug] | order(_updatedAt desc) {
        ${postFields}
        content,
      }`,
        { slug }
      )
      .then((res) => res?.[0]),
    curClient.fetch(
      `*[_type == "post" && slug.current != $slug] | order(date desc, _updatedAt desc){
        ${postFields}
        content,
      }[0...4]`,
      { slug }
    ),
  ]);
  return { post, morePosts: getUniquePosts(morePosts) };
}

export async function getPreviewProductBySlug(slug) {
  const data = await getClient(true).fetch(
    `*[_type == "product" && slug.current == $slug] | order(date desc){
      ${productFields}
      content,
    }`,
    { slug }
  );
  return data[0];
}

export async function getProductAndMore(slug, preview) {
  const curClient = getClient(preview);
  const [product, moreProducts] = await Promise.all([
    curClient
      .fetch(
        `*[_type == "product" && slug.current == $slug] | order(_updatedAt desc) {
        ${productFields}
        content,
      }`,
        { slug }
      )
      .then((res) => res?.[0]),
    curClient.fetch(
      `*[_type == "product" && slug.current != $slug] | order(date desc, _updatedAt desc){
        ${productFields}
        content,
      }[0...4]`,
      { slug }
    ),
  ]);

  return { product, moreProducts: getUniquePosts(moreProducts) };
}
