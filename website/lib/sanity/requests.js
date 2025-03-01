import sanityImage from '@sanity/image-url';
import { subMonths } from 'date-fns';

import client, { previewClient } from './config';
import dateTodayISO from '~/functions/dateTodayISO';
import dateTodayYyyyMmDd from '~/functions/dateTodayYyyyMmDd';

const blockContent = `
{
    ...,
    _type == "image" => {
      'url': asset->url,
      'caption': caption,
      'fullImage': fullImage,
      'dimensions': asset->metadata.dimensions
    },
    _type == "audioFileBlock" => {
      title,
      description,
      "url": audioFile.asset->url,
      "mimeType": audioFile.asset->mimeType,
      "imageUrl": image.asset->url,
    },
    _type == "carousel" => {
       'images': images[] {
        'imageObject': {
          'url': asset->url,
          'caption': caption,
          'fullImage': fullImage,
          'dimensions': asset->metadata.dimensions
        },
      },
    }
  }
`;

const postFields = `
  name,
  title,
  publishedAt,
  body[]${blockContent},
  introduction,
  socialHandles,
  socialTagline,
  'categories': categories[]->title,
  'tag': tag->{...},
  'slug': slug.current,
  'coverImage': image.asset->url,
  'imageObject': {
    'url': image.asset->url,
    'caption': image.caption,
    'fullImage': image.fullImage,
    'dimensions': image.asset->metadata.dimensions
  },
  'authors': authors[] {
    'author': *[_id == ^._ref] [0] {
      ...,
      'imageObject': {
        'url': image.asset->url,
        'caption': image.caption,
        'fullImage': image.fullImage,
        'dimensions': image.asset->metadata.dimensions
      },
    },
  },
`;

const postFieldsCard = `
  _id,
  hasPostedDiscord,
  name,
  title,
  publishedAt,
  'slug': slug.current,
  'coverImage': image.asset->url,
  'imageObject': {
    'url': image.asset->url,
    'caption': image.caption,
    'fullImage': image.fullImage,
    'dimensions': image.asset->metadata.dimensions
  },
  'authors': authors[] {
    'author': *[_id == ^._ref] [0] {
      ...,
    },
  },
`;

const creationsFields = `
  name,
  title,
  publishedAt,
  description,
  socialHandles,
  excerpt,
  publicBody,
  body,
  socialTagline,
  'slug': slug.current,
  'coverImage': image.asset->url,
  'imageObject': {
    'url': image.asset->url,
    'caption': image.caption,
    'fullImage': image.fullImage,
    'dimensions': image.asset->metadata.dimensions
  },
  categories,
  'authors': authors[] {
    'author': *[_id == ^._ref] [0] {
      ...,
    },
  },
`;

const creationsFieldsCard = `
  name,
  title,
  excerpt,
  publishedAt,
  'slug': slug.current,
  categories,
  'coverImage': image.asset->url,
  'imageObject': {
    'url': image.asset->url,
    'caption': image.caption,
    'fullImage': image.fullImage,
    'dimensions': image.asset->metadata.dimensions
  },
`;

const productFields = `
  ...,
   'imageObject': {
    'url': image1.asset->url,
    'caption': image1.caption,
    'fullImage': image1.fullImage,
    'dimensions': image1.asset->metadata.dimensions
  },
  'category': category->title,
  'collection': collection->title,
  'slug': slug.current,
  'images': images[] {
    'imageObject': {
      'url': asset->url,
      'caption': caption,
      'fullImage': fullImage,
      'dimensions': asset->metadata.dimensions
    }
  },
  credits,
  stripeCheckoutUrl,
`;

const teamFields = `
  image,
  'imageObject': {
    'url': image.asset->url,
    'caption': image.caption,
    'fullImage': image.fullImage,
    'dimensions': image.asset->metadata.dimensions
  },
  name,
  alias,
  description,
  coreTeam,
  role,
  'slug': slug.current,
`;

const tagFields = `
  ...,
  'slug': slug.current,
`;

const getClient = (preview) => (preview ? previewClient : client);

export const imageBuilder = sanityImage(client);

export async function getFileUrl(fileRef) {
  const query = `*[_id == $id][0] { "url": asset->url }`;
  const params = { id: fileRef };

  console.log('query', query);
  console.log('params', params);

  try {
    const result = await client.fetch(query, params);
    console.log('result', result);
    return result?.url || null;
  } catch (error) {
    console.error('Error fetching file URL:', error);
    return null;
  }
}

export async function getSiteConfig() {
  const data = await client.fetch('*[_type == "siteSettings"] [0] { ..., }');
  return data;
}

// Posts
export async function getPreviewPostBySlug(slug) {
  const today = dateTodayISO();

  const data = await getClient(true).fetch(
    `*[_type == "post" && slug.current == $slug && publishedAt < $today]{
      ${postFields}
      content
    }`,
    { slug, today }
  );
  return data[0];
}

export async function getPostWithSearch(slug) {
  const today = dateTodayISO();

  // Fetch posts matching title
  const titleMatches = await client.fetch(
    `*[_type == "post" && title match $slug && publishedAt < $today] | order(publishedAt desc) {
      ${postFieldsCard}
    }`,
    { slug, today }
  );

  // Fetch posts matching all other fields
  const otherMatches = await client.fetch(
    `*[_type == "post" && 
      (excerpt match $slug || 
      introduction[].children[].text match $slug || 
      body[].children[].text match $slug) && 
      publishedAt < $today] | order(publishedAt desc) {
      ${postFieldsCard}
    }`,
    { slug, today }
  );

  // Merge and remove duplicates
  const mergedData = [...titleMatches, ...otherMatches];
  const uniqueData = Array.from(new Set(mergedData.map((a) => a._id))).map(
    (_id) => mergedData.find((a) => a._id === _id)
  );

  return uniqueData;
}

export async function getFeaturedPosts(preview) {
  const today = dateTodayISO();

  const results = await getClient(preview).fetch(
    `*[_type == "post"] | order(publishedAt desc) [0..5] {
      ${postFieldsCard}
    }`,
    { today }
  );
  return results;
}

export async function getAllPosts(preview) {
  const today = dateTodayISO();

  const results = await getClient(preview).fetch(
    `*[_type == "post" && publishedAt < $today] | order(publishedAt desc) [0..12] {
      ${postFieldsCard}
    }`,
    { today }
  );
  return results;
}

export async function getAllPostsTotal(preview) {
  const today = dateTodayISO();

  const results = await getClient(preview).fetch(
    `*[_type == "post" && publishedAt < $today] | order(publishedAt desc) {
      ${postFieldsCard}
    }`,
    { today }
  );

  return results;
}

export async function getAllCreationsTotal(preview) {
  const results = await getClient(preview)
    .fetch(`*[_type == "creations"] | order(publishedAt desc) {
      ${creationsFieldsCard}
    }`);
  return results;
}

export async function getLatestDominionCreations(preview) {
  const results = await getClient(preview).fetch(
    `*[_type == "creations"] | order(publishedAt desc) [0..23] {
      ${creationsFieldsCard}
    }`
  );

  return results;
}

export async function getCreation(slug, preview) {
  const results = await getClient(preview).fetch(
    `*[_type == "creations" && slug.current == $slug] | order(publishedAt desc) [0] {
      ${creationsFields}
    }`,
    { slug }
  );

  return results;
}

export async function getAllGalleryTotal(preview) {
  const results = await getClient(preview)
    .fetch(`*[_type == "gallery"] | order(publishedAt desc) {
      ${postFieldsCard}
      galleryImages[]{
        "fileName": asset->originalFilename,
        ...,
        'imageObject': {
          'url': asset->url,
          'caption': caption,
          'fullImage': fullImage,
          'dimensions': asset->metadata.dimensions
        },
      }
    }`);
  return results;
}

export async function getGallery(slug, preview) {
  const [gallery, morePosts] = await Promise.all([
    getClient(preview)
      .fetch(
        `*[_type == "gallery" && slug.current == $slug] | order(publishedAt desc)[0] {
          ${postFields}
          galleryImages[]{
            "fileName": asset->originalFilename,
            ...,
            'imageObject': {
              'url': asset->url,
              'caption': caption,
              'fullImage': fullImage,
              'dimensions': asset->metadata.dimensions
            },
          }
        }
        `,
        { slug }
      )
      .then((res) => res),
    getClient(preview).fetch(
      `*[_type == "post" && tag._ref in *[_type == "gallery" && slug.current == $slug]._id] {
          ${postFields}
        }`,
      { slug }
    ),
  ]);

  return { gallery, morePosts };
}

export async function getCategory(category, range, division = null) {
  const today = dateTodayISO();
  const rangeFrom = range[0] - 1;
  const rangeTo = range[1] - 1;

  let divisionFilter = '';
  if (division) {
    divisionFilter = `&& count(divisions[_ref in *[_type == "division" && slug.current == $division]._id]) > 0`;
  }

  const results = await getClient(null).fetch(
    `*[_type == "category" && slug.current == $category] [0] {
      ...,
      "posts": *[_type == "post" && references(^._id) ${divisionFilter} && publishedAt < $today] | order(publishedAt desc) [$rangeFrom..$rangeTo] {
        ${postFieldsCard}
      }
    }`,
    { category, rangeFrom, rangeTo, today, division }
  );

  return results;
}

export async function getDivision(
  division,
  range,
  category = null,
  exclude = null
) {
  const today = dateTodayISO();

  const rangeFrom = range[0] - 1;
  const rangeTo = range[1] - 1;

  const categoryQuery = category
    ? `&& "${category}" in categories[]->slug.current`
    : '';

  const exclusionQuery = exclude
    ? `&& !(${exclude
        .map((e) => `"${e}" in categories[]->slug.current`)
        .join(' || ')})`
    : '';

  const results = await getClient(null).fetch(
    `*[_type == "division" && slug.current == $division][0] {
      ...,
      "posts": *[_type == "post" && references(^._id) ${categoryQuery} ${exclusionQuery} && publishedAt < $today && hidePublic != true] | order(publishedAt desc) [$rangeFrom..$rangeTo] {
        _id,
        hasPostedDiscord,
        name,
        title,
        publishedAt,
        'slug': slug.current,
        'coverImage': image.asset->url,
        'imageObject': {
          'url': image.asset->url,
          'caption': image.caption,
          'fullImage': image.fullImage,
          'dimensions': image.asset->metadata.dimensions
        },
        'authors': authors[] {
          'author': *[_id == ^._ref][0] {
            ...,
          },
        },
      }
    }`,
    { division, rangeFrom, rangeTo, today, category, exclude }
  );

  return results;
}

export async function getFeatured(range) {
  const today = dateTodayISO();

  const rangeFrom = range[0] - 1;
  const rangeTo = range[1] - 1;

  const results = await getClient(null).fetch(
    `*[_type == "post" && publishedAt < $today && isFeatured] | order(publishedAt desc)[$rangeFrom..$rangeTo] {
      _id,
      hasPostedDiscord,
      name,
      title,
      publishedAt,
      'slug': slug.current,
      'coverImage': image.asset->url,
      'categories': categories[]->title,
      'divisions': divisions[]->title,
      'imageObject': {
        'url': image.asset->url,
        'caption': image.caption,
        'fullImage': image.fullImage,
        'dimensions': image.asset->metadata.dimensions
      },
      'authors': authors[] {
        'author': *[_id == ^._ref][0] {
          ...,
        },
      },
    }`,
    { rangeFrom, rangeTo, today }
  );

  return results;
}

export async function getBlueprints(range) {
  const today = dateTodayISO();

  const rangeFrom = range[0] - 1;
  const rangeTo = range[1] - 1;

  const results = await getClient(null).fetch(
    `*[_type == "post" && publishedAt < $today && isFeatured] | order(publishedAt desc)[$rangeFrom..$rangeTo] {
      ${postFields}
    }`,
    { rangeFrom, rangeTo, today }
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
        `*[_type == "cypher" && isActive] | order(publishedAt desc) [0] { ..., } `
      )
      .then((res) => res),
    curClient.fetch(
      `*[_type == "cypher" && (isActive == null || !isActive)] { ..., }  | order(_createdAt desc)`
    ),
  ]);

  return { current: current || null, previous };
}

export async function getTeamMembers(preview) {
  const results = await getClient(preview)
    .fetch(`*[_type == "author"] | order(order asc){
      ${teamFields}
    }`);
  return results;
}

// export async function getCredits(preview) {
//   const results = await getClient(preview)
//     .fetch(`*[_type == "credits"] | order(order asc){
//       ...
//     }`);
//   return results;
// }

// export async function getCreditsItem(slug, preview) {
//   const results = await getClient(preview).fetch(
//     `*[_type == "credits" && slug.current == $slug] [0] {
//      ...,
//     }`,
//     { slug }
//   );
//   return results;
// }

export async function getTeamMemberAndPosts(slug, preview) {
  const today = dateTodayISO();

  const results = await getClient(preview).fetch(
    `*[_type == "author" && slug.current == $slug] [0] {
      ${teamFields}
      "posts": *[_type == "post" && references(^._id) && publishedAt < $today] | order(publishedAt desc) [0..23] {
        ${postFieldsCard}
      }
    }`,
    { slug, today }
  );
  return results;
}

export async function getTags(preview) {
  const results = await getClient(preview)
    .fetch(`*[_type == "refTag"] | order(order asc){
      ${tagFields}
    }`);
  return results;
}

export async function getTagAndPosts(slug, preview) {
  const today = dateTodayISO();

  const results = await getClient(preview).fetch(
    `*[_type == "refTag" && slug.current == $slug] [0] {
      ${tagFields}
      "posts": *[references(^._id) && publishedAt < $today] | order(publishedAt desc) [0..23] {
        ${postFieldsCard}
      }
    }`,
    { slug, today }
  );
  return results;
}

export async function getAllProducts(preview) {
  const results = await getClient(preview)
    .fetch(`*[_type == "storeItem"] | order(publishedAt desc) {
      ${productFields}
    }`);
  return results;
}

export async function getLatestPrintedIssue(preview) {
  const results = await getClient(preview).fetch(
    `*[_type == "storeItem" && category->title == "Printed Issues"] | order(publishedAt desc) [0] {
       ${productFields}
    }`
  );
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

export async function getPost(slug, preview) {
  const curClient = getClient(preview);
  const today = dateTodayISO();
  let post;

  if (preview) {
    post = await getClient(preview).fetch(
      `*[_type == "post" && slug.current == $slug] | order(publishedAt desc) [0] {
     ${postFields}
     content,
   }`,
      { slug }
    );
  } else {
    post = await getClient(preview).fetch(
      `*[_type == "post" && slug.current == $slug && publishedAt < $today] | order(publishedAt desc) [0] {
     ${postFields}
     content,
   }`,
      { slug, today }
    );
  }

  return post;
}

export async function getMorePosts(slug, preview) {
  const curClient = getClient(preview);
  const today = dateTodayISO();

  const morePosts = await getClient(preview).fetch(
    `*[_type == "post" && slug.current != $slug] | order(publishedAt desc){
      ${postFieldsCard}
      content,
    }[0...4]`,
    { slug }
  );

  return morePosts;
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
  const results = await getClient(preview).fetch(
    `*[_type == "dominionItem"] | order(activeFrom desc) [0] {
      ...,
      'imageObject': {
        'url': coverImage.asset->url,
        'caption': coverImage.caption,
        'fullImage': coverImage.fullImage,
        'dimensions': coverImage.asset->metadata.dimensions
      },
    }`
  );

  return results;
}

export async function getLatestNewsletterGeneral(preview) {
  const results = await getClient(preview).fetch(
    `*[_type == "newsletterGeneral"] | order(activeFrom desc) [0] {
      ...,
    }`
  );

  return results;
}

export async function getLatestNewsletterCypher(preview) {
  const results = await getClient(preview).fetch(
    `*[_type == "newsletterCypher"] | order(activeFrom desc) [0] {
      ...,
    }`
  );

  return results;
}

// Fetch Dominion Items (Messages)
export async function getDominionItemsSince(user, preview) {
  const curClient = getClient(preview);
  const dominionSinceDate = user.dominionSince;
  const year = new Date(dominionSinceDate).getFullYear();
  const startOfYearDate = new Date(`${year}-01-01`).toISOString();
  const startDate2024 = new Date('2024-01-01').toISOString();

  const results = await curClient.fetch(
    `*[_type == "dominionItem" && activeFrom >= $startOfYearDate && activeFrom >= $startDate2024] | order(activeFrom desc) {
      ...,
      "slug": slug.current,
      "attachments": attachments[] {
        title,
        "file": file.asset->url,
        "url": file.asset->url,
        "mimeType": file.asset->mimeType,
      },
      'imageObject': {
        'url': coverImage.asset->url,
        'caption': coverImage.caption,
        'fullImage': coverImage.fullImage,
        'dimensions': coverImage.asset->metadata.dimensions
      },
      'description': description[]{
        ...,
        _type == 'image' => {
          'imageObject': {
            'url': asset->url,
            'caption': caption,
            'fullImage': fullImage,
            'dimensions': asset->metadata.dimensions
          }
        }
      }
    }`,
    { startOfYearDate, startDate2024 }
  );

  return results;
}

// Fetch Dominion Resources
export async function getDominionResourcesSince(user, preview) {
  const curClient = getClient(preview);
  const dominionSinceDate = user.dominionSince;
  const year = new Date(dominionSinceDate).getFullYear();
  const startOfYearDate = new Date(`${year}-01-01`).toISOString();
  const startDate2024 = new Date('2020-01-01').toISOString();

  const results = await curClient.fetch(
    `*[_type == "dominionResource" && activeFrom >= $startOfYearDate && activeFrom >= $startDate2024] | order(activeFrom desc) {
      ...,
      "slug": slug.current,
      "attachments": attachments[] {
        title,
        "file": file.asset->url,
        "url": file.asset->url,
        "mimeType": file.asset->mimeType,
      },
      'imageObject': {
        'url': coverImage.asset->url,
        'caption': coverImage.caption,
        'fullImage': coverImage.fullImage,
        'dimensions': coverImage.asset->metadata.dimensions
      },
      'description': description[]${blockContent}
    }`,
    { startOfYearDate, startDate2024 }
  );

  return results;
}

export async function getSmartLink(slug, preview) {
  const results = await getClient(preview).fetch(
    `*[_type == "smartLink" && slug.current == $slug] | order(activeFrom desc) [0] {
      title,
      slug,
      'items': items[] {
        ...,
        'documentInternal': documentInternal {
          'document': *[_id == ^._ref] [0] {
            ...,
          },
        },
      },
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
    `*[_type == "user" && publicProfile && isDominion] {
      'avatar': avatar.asset->url,
    }`
  );
  return results;
}

export async function getAllOfferings(sinceStartOfMonth, showAll, preview) {
  const today = dateTodayYyyyMmDd();
  const show = showAll ? 250 : 8;

  const results = await getClient(preview).fetch(
    `*[_type == "offering" && publishedAt >= $sinceStartOfMonth && publishedAt <= $today] | order(publishedAt desc) [0..$show] {
      ...,
      'tracks': tracks[] {
        'track': *[_id == ^._ref] [0] {
          ...,
          'image': image.asset->url,
          'file': file.asset->url,
        },
      }
    }`,
    { sinceStartOfMonth, today, show }
  );
  return results;
}

export async function getAllPacks(showAll, preview) {
  const show = showAll ? 250 : 8;

  const results = await getClient(preview).fetch(
    `*[_type == "pack"] | order(publishedAt desc) [0..$show] {
      ...,
      'folder': folder.asset->url,
    }`,
    { show }
  );
  return results;
}

export async function getAllPrints(preview) {
  const results = await getClient(preview).fetch(
    `*[_type == "print"] | order(publishedAt desc) [0..99] {
      ...,
      'imageObject': {
        'url': image.asset->url,
        'caption': image.caption,
        'fullImage': image.fullImage,
        'dimensions': image.asset->metadata.dimensions
      },
      'file': file.asset->url,
    }`
  );
  return results;
}

export async function getHomePage() {
  const data = await client.fetch(`*[_type == "homePage"] [0] {
    ...,
    'heroImage': heroImage.asset->url,
    'imageObject': {
      'url': heroImage.asset->url,
      'caption': heroImage.caption,
      'fullImage': heroImage.fullImage,
      'dimensions': heroImage.asset->metadata.dimensions
    },
   }`);
  return data;
}
