import sanityImage from '@sanity/image-url';

import client, { previewClient } from './config';
import dateTodayISO from '~/functions/dateTodayISO';
import dateTodayYyyyMmDd from '~/functions/dateTodayYyyyMmDd';

const postFields = `
  name,
  title,
  publishedAt,
  description,
  'slug': slug.current,
  'coverImage': image.asset->url,
  'category': category->title,
  'author': author->{
    ...,
  },
  ...,
`;

const productFields = `
  ...,
  'category': category->title,
  'collection': collection->title,
  'slug': slug.current,
  'image1': image1.asset->url,
  'image2': image2.asset->url,
`;

const teamFields = `
  ...,
  'slug': slug.current,
`;

const getClient = (preview) => (preview ? previewClient : client);

export const imageBuilder = sanityImage(client);

export async function getSiteConfig() {
  const data = await client.fetch('*[_type == "siteSettings"] [0] { ..., }');
  return data;
}

// Posts
export async function getPreviewPostBySlug(slug) {
  const data = await getClient(true).fetch(
    `*[_type == "post" && slug.current == $slug]{
      ${postFields}
      content
    }`,
    { slug }
  );
  return data[0];
}

export async function getPostWithSearch(slug) {
  const data = await client.fetch(
    `*[_type == "post" && title match $slug || _type == "post" && excerpt match $slug] | order(publishedAt desc) {
      ${postFields}
     }`,
    { slug }
  );
  return data;
}

export async function getFeaturedPost(preview) {
  const results = await getClient(preview)
    .fetch(`*[_type == "post" && featured] | order(publishedAt desc) [0] {
      ${postFields}
    }`);
  return results;
}

export async function getAllPosts(preview) {
  const results = await getClient(preview)
    .fetch(`*[_type == "post"] | order(publishedAt desc) [0..31] {
      ${postFields}
    }`);
  return results;
}

export async function getAllPostsTotal(preview) {
  const results = await getClient(preview)
    .fetch(`*[_type == "post"] | order(publishedAt desc) {
      ${postFields}
    }`);

  return results;
}

export async function getAllCreationsTotal(preview) {
  const results = await getClient(preview)
    .fetch(`*[_type == "creations"] | order(publishedAt desc) {
      ${postFields}
    }`);
  return results;
}

export async function getLatestDominionCreations(preview) {
  const results = await getClient(preview).fetch(
    `*[_type == "creations"] | order(publishedAt desc) [0..23] {
      ${postFields}
    }`
  );

  return results;
}

export async function getCreation(slug, preview) {
  const results = await getClient(preview).fetch(
    `*[_type == "creations" && slug.current == $slug] | [0] {
      ${postFields}
    }`,
    { slug }
  );

  return results;
}

export async function getCategory(category, range) {
  const rangeFrom = range[0] - 1;
  const rangeTo = range[1] - 1;

  const results = await getClient(null).fetch(
    `*[_type == "category" && slug.current == $category] [0] {
      ...,
          "articles": *[_type == "post" && references(^._id)] | order(publishedAt desc) [$rangeFrom..$rangeTo] {
            ${postFields}
            }
          }`,
    { category, rangeFrom, rangeTo }
  );

  return results;
}

export async function getAllCategoriesTotal(preview) {
  const results = await getClient(preview).fetch(`*[_type == "category"] {
      ...,
    }`);

  return results;
}

export async function getCurrentAndPreviousCyphers(preview) {
  const curClient = getClient(preview);

  const [current, previous] = await Promise.all([
    curClient
      .fetch(
        `*[_type == "cypher" && announcementFields.isAnnounced && !publishedFields.isPublished] | order(announcementFields.announcedAt desc) {
              ...,
            } `
      )
      .then((res) => res?.[0]),
    curClient.fetch(
      `*[_type == "cypher" && publishedFields.isPublished] {
            ...,
            }  | order(publishedFields.publishedAt desc)`
    ),
  ]);

  return { current: current || null, previous };
}

export async function getLatestAnouncedCypher(preview) {
  const results = await getClient(preview)
    .fetch(`*[_type == "cypher" && announcementFields.isAnnounced && !publishedFields.isPublished] | order(announcementFields.announcedAt desc) [0] {
      ...,
    }`);

  return results;
}

export async function getLatestPublishedCypher(preview) {
  const results = await getClient(preview)
    .fetch(`*[_type == "cypher" && publishedFields.isPublished] | order(publishedFields.publishedAt desc) [0] {
      ...,
    }`);

  return results;
}

export async function getTeamMembers(preview) {
  const results = await getClient(preview)
    .fetch(`*[_type == "author" && active] | order(order asc){
      ${teamFields}
    }`);
  return results;
}

export async function getTeamMemberAndPosts(slug, preview) {
  const results = await getClient(preview).fetch(
    `*[_type == "author" && active && slug.current == $slug] [0] {
      ${teamFields}
      "posts": *[_type == "post" && references(^._id)] | order(publishedAt desc) [0..23] {
        ${postFields}
      }
    }`,
    { slug }
  );
  return results;
}

export async function getAllProducts(preview) {
  const results = await getClient(preview)
    .fetch(`*[_type == "storeItem"] | order(publishedAt asc) {
      ${productFields}
    }`);
  return results;
}

export async function getAllProductsTotal(preview) {
  const results = await getClient(preview)
    .fetch(`*[_type == "storeItem"] | order(publishedAt desc) {
      ${productFields}
    }`);
  return results;
}

export async function getProduct(slug, preview) {
  const results = await getClient(preview).fetch(
    `*[_type == "storeItem" && slug.current == $slug] | order(publishedAt desc) [0] {
      ${productFields}
    }`,
    { slug }
  );
  return results;
}

export async function getPostAndMore(slug, preview) {
  const curClient = getClient(preview);
  const [post, morePosts] = await Promise.all([
    curClient
      .fetch(
        `*[_type == "post" && slug.current == $slug] | order(publishedAt desc) {
        ${postFields}
        content,
      }`,
        { slug }
      )
      .then((res) => res?.[0]),
    curClient.fetch(
      `*[_type == "post" && slug.current != $slug] | order(publishedAt desc){
        ${postFields}
        content,
      }[0...4]`,
      { slug }
    ),
  ]);
  return { post, morePosts };
}

export async function getPreviewProductBySlug(slug) {
  const data = await getClient(true).fetch(
    `*[_type == "product" && slug.current == $slug] {
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
        `*[_type == "product" && slug.current == $slug] | order(publishedAt desc) {
        ${productFields}
        content,
      }`,
        { slug }
      )
      .then((res) => res?.[0]),
    curClient.fetch(
      `*[_type == "product" && slug.current != $slug] | order(publishedAt desc){
        ${productFields}
        content,
      }[0...4]`,
      { slug }
    ),
  ]);

  return { product, moreProducts };
}

export async function getLatestMix(preview) {
  const results = await getClient(preview).fetch(`*[_type == "mix"] [0] {
      ...,
    }`);

  return results;
}

export async function getMixes(preview) {
  const results = await getClient(preview)
    .fetch(`*[_type == "mix"] | order(publishedAt desc) [0..15] {
      ...,
    }`);
  return results;
}

export async function getLatestDominionItem(preview) {
  const today = dateTodayYyyyMmDd();

  const results = await getClient(preview).fetch(
    `*[_type == "dominionItem"] | order(activeFrom desc) [0] {
      ...,
    }`,
    { today }
  );

  return results;
}

export async function getDominionItemsSinceDate(sinceStartOfMonth, preview) {
  const curClient = getClient(preview);
  const today = dateTodayYyyyMmDd();

  const [results, welcome] = await Promise.all([
    curClient
      .fetch(
        `*[_type == "dominionItem" && slug.current != "welcome-to-the-dominion" && activeFrom >= $sinceStartOfMonth && activeFrom <= $today && showInProfile] | order(activeFrom asc) {
        ...,
        "slug": slug.current,
      }`,
        { sinceStartOfMonth, today }
      )
      .then((res) => res),
    curClient.fetch(
      `*[_type == "dominionItem" && slug.current == "welcome-to-the-dominion" && showInProfile] [0] {
        ...,
        "slug": slug.current,
      }`
    ),
  ]);

  results.unshift(welcome);
  return results;
}

export async function getSmartLink(slug, preview) {
  const results = await getClient(preview).fetch(
    `*[_type == "smartLink" && slug.current == $slug] | order(activeFrom desc) [0] {
      ...,
    }`,
    { slug }
  );
  return results;
}

export async function getSmartLinksTotal(preview) {
  const results = await getClient(preview).fetch(
    `*[_type == "smartLink" && slug.current] | order(activeFrom desc) {
      ...,
    }`
  );
  return results;
}

export async function getLinkInBio(preview) {
  const results = await getClient(preview).fetch(
    `*[_type == "linkInBio"] [0] {
      'items': items[] [0..11] {
        'field': field {
          'documentInternal': documentInternal {
            'document': *[_id == ^._ref] [0] {
              ...,
            },
          },
          ...,
        },
        ...,
      }
    }`
  );
  return results;
}

export async function getDominionPipeline(preview) {
  const results = await getClient(preview).fetch(
    `*[_type == "dominionPipeline"] [0] {
      ...,
    }`
  );
  return results;
}

export async function getDominionUsers(preview) {
  const results = await getClient(preview).fetch(
    `*[_type == "user" && publicProfile] [0..13] {
      name,
      handle,
      avatar
    }`
  );
  return results;
}

export async function getAllOfferings(sinceStartOfMonth, preview) {
  const today = dateTodayYyyyMmDd();

  const results = await getClient(preview).fetch(
    `*[_type == "offering" && publishedAt >= $sinceStartOfMonth && publishedAt <= $today] | order(publishedAt asc) {
      ...,
      'tracks': tracks[] {
        'track': *[_id == ^._ref] [0] {
          'file': file.asset->url,
          ...,
        },
      }
    }`,
    { sinceStartOfMonth, today }
  );
  return results;
}
