const previewSecret = "q2r5hm7ds9"; // Copy the string you used for SANITY_PREVIEW_SECRET

export default function resolveProductionUrl(document) {
  let page = document._type;

  switch (document._type) {
    case "post":
      page = "article";
      break;
    case "author":
      page = "team";
      break;
    default:
  }

  return `https://rendahmag.com/api/sanity/preview?secret=${previewSecret}&page=${page}&slug=${document.slug.current}`;
}
