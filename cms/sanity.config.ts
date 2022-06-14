// {
//   "root": true,
//   "project": {
//     "name": "rendahmag"
//   },
//   "api": {
//     "projectId": "q8z2vf2k",
//     "dataset": "production"
//   },
//   "plugins": [
//     "@sanity/base",
//     "@sanity/components",
//     "@sanity/default-layout",
//     "@sanity/default-login",
//     "@sanity/desk-tool",
//     "@sanity/production-preview",
//     "@sanity/dashboard",
//     "autocomplete-tags"
//   ],
//   "env": {
//     "development": {
//       "plugins": [
//         "@sanity/vision"
//       ]
//     }
//   },
//   "parts": [
//     {
//       "name": "part:@sanity/base/schema",
//       "path": "./schemas/schema"
//     },
//     {
//       "implements": "part:@sanity/production-preview/resolve-production-url",
//       "path": "./resolveProductionUrl.js"
//     },
//     {
//       "name": "part:@sanity/desk-tool/structure",
//       "path": "./deskStructure.js"
//     },
//     {
//       "implements": "part:@sanity/base/document-actions/resolver",
//       "path": "resolveDocumentActions.js"
//     }
//   ]
// }

// V3 sanity.config.ts
import { createConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { schemaTypes } from "./schemas/schema";
import { structure, defaultDocumentNode } from "./structure";

import blockContent from "./blockContent";

// Blog
import blogPost from "./documents/blogPost";
import blogAuthor from "./documents/blogAuthor";
import blogCategory from "./documents/blogCategory";
import refTag from "./documents/refTag";

// Store
import storeCategory from "./documents/storeCategory";
import storeCollection from "./documents/storeCollection";
import storeItem from "./documents/storeItem";
import storeVariant from "./documents/storeVariant";

// Cypher
import cypher from "./documents/cypher";

// Guest Mix
import mix from "./documents/mix";

// Dominion
import dominionItem from "./documents/dominionItem";
import user from "./documents/user";
import dominionPipelineItem from "./objects/dominionPipelineItem";
import dominionPipeline from "./objects/dominionPipeline";
import creations from "./documents/creations";
import offering from "./documents/offering";

import galleryPost from "./documents/galleryPost";

// Smart Link
import smartLinkItem from "./documents/smartLinkItem";
import smartLink from "./documents/smartLink";

// Audio
import track from "./documents/audio/track";
import pack from "./documents/audio/pack";

import siteSettings from "./objects/siteSettings";

import { CustomPublish } from "./actions/CustomPublish";
import { CustomDelete } from "./actions/CustomDelete";
import { CustomUnpublish } from "./actions/CustomUnpublish";
import { PreviewLink } from "./actions/PreviewLink";

export default createConfig({
  name: "rendahmag",
  title: "Rendah Mag",
  projectId: "q8z2vf2k",
  dataset: "production",
  plugins: [deskTool({ structure, defaultDocumentNode })],
  schema: {
    types: [
      blockContent,
      //
      refTag,
      blogPost,
      blogAuthor,
      blogCategory,
      storeCategory,
      storeCollection,
      storeItem,
      storeVariant,
      cypher,
      mix,
      user,
      track,
      pack,
      dominionItem,
      smartLinkItem,
      smartLink,
      dominionPipelineItem,
      dominionPipeline,
      creations,
      offering,
      galleryPost,
      //
      siteSettings
    ]
  },
  document: {
    productionUrl: document => {
      const previewSecret = "q2r5hm7ds9"; // Copy the string you used for SANITY_PREVIEW_SECRET

      let page = document._type;
      let slug = document?.slug?.current || "null";

      switch (document._type) {
        case "post":
          page = "article";
          break;
        case "author":
          page = "team";
          break;
        default:
      }

      return `https://rendahmag.com/api/sanity/preview?secret=${previewSecret}&page=${page}&slug=${slug}`;
    },
    actions: prev => {
      const actions = [];

      prev.map(previousAction => {
        switch (previousAction.action) {
          case "publish":
            return actions.push(CustomPublish);
            break;
          case "delete":
            return actions.push(CustomDelete);
            break;
          case "unpublish":
            return actions.push(CustomUnpublish);
            break;
          // default:
          //   return actions.push(Action);
        }
      });

      actions.push(PreviewLink);

      return actions;
    }
  }
});

export default function resolveDocumentActions(props) {
  const actions = [];

  defaultResolve(props).map(Action => {});

  actions.push(PreviewLink);

  return actions;
}
