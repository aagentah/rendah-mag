import { SITE_URL } from "../website/constants";

const previewSecret = "q2r5hm7ds9"; // Copy the string you used for SANITY_PREVIEW_SECRET

export default function resolveProductionUrl(document) {
  let page = document._type;

  switch (document._type) {
    case "post":
      page = "article";
      break;
    default:
  }

  return `${SITE_URL}/api/sanity/preview?secret=${previewSecret}&page=${page}&slug=${document.slug.current}`;
}
