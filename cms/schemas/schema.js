// schemas/schema.js
import blockContent from "./blockContent";
import blogPost from "./documents/blogPost";
import blogAuthor from "./documents/blogAuthor";
import blogCategory from "./documents/blogCategory";
import blogDivision from "./documents/blogDivision";
import newsletterGeneral from "./documents/newsletterGeneral";
import newsletterCypher from "./documents/newsletterCypher";
import storeCategory from "./documents/storeCategory";
import storeCollection from "./documents/storeCollection";
import storeItem from "./documents/storeItem";
import cypher from "./documents/cypher";
import dominionItem from "./documents/dominionItem";
import user from "./documents/user";
// import dominionPipeline from "./objects/dominionPipeline";
import creations from "./documents/creations";
import offering from "./documents/offering";
import prints from "./documents/prints";
import galleryPost from "./documents/galleryPost";
import track from "./documents/audio/track";
import pack from "./documents/audio/pack";
import homePage from "./objects/homePage";
import siteSettings from "./objects/siteSettings";
// import dominionShipping from "./objects/dominionShipping";
// import dominionOverview from "./objects/dominionOverview";
// import stripeMetrics from "./objects/stripeMetrics";

export default [
  blockContent,
  siteSettings,
  homePage,
  blogPost,
  blogAuthor,
  blogCategory,
  blogDivision,
  galleryPost,
  storeCategory,
  storeCollection,
  storeItem,
  cypher,
  dominionItem,
  user,
  // dominionPipeline,
  creations,
  offering,
  prints,
  track,
  pack,
  // dominionShipping,
  // dominionOverview,
  // stripeMetrics,
  newsletterGeneral,
  newsletterCypher,
];
