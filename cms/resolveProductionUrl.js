import { SITE_URL } from "../website/constants";

const previewSecret = "q2r5hm7ds9"; // Copy the string you used for SANITY_PREVIEW_SECRET

export default function resolveProductionUrl(document) {
  return `${SITE_URL}/api/sanity/preview?secret=${previewSecret}&page=${document._type}&slug=${document.slug.current}`;
}
