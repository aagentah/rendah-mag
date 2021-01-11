import createSchema from "part:@sanity/base/schema-creator";
import schemaTypes from "all:part:@sanity/base/schema-type";

import blockContent from "./blockContent";

// Blog
import blogPost from "./documents/blogPost";
import blogAuthor from "./documents/blogAuthor";
import blogCategory from "./documents/blogCategory";

// Store
import storeCategory from "./documents/storeCategory";
import storeCollection from "./documents/storeCollection";
import storeItem from "./documents/storeItem";
import storeVariant from "./documents/storeVariant";

// Cypher
import cypher from "./documents/cypher";

// Guest Mix
import mix from "./documents/mix";

// User
// Dominion
import dominionItem from "./documents/dominionItem";
import user from "./documents/user";
import dominionPipelineItem from "./objects/dominionPipelineItem";
import dominionPipeline from "./objects/dominionPipeline";

// Smart Link
import smartLinkItem from "./documents/smartLinkItem";
import smartLink from "./documents/smartLink";

// Link In Bio
import linkInBioItem from "./objects/linkInBioItem";
import linkInBio from "./objects/linkInBio";

import siteSettings from "./objects/siteSettings";

export default createSchema({
  name: "default",
  types: schemaTypes.concat([
    blockContent,
    //
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
    dominionItem,
    smartLinkItem,
    smartLink,
    linkInBioItem,
    linkInBio,
    dominionPipelineItem,
    dominionPipeline,
    //
    siteSettings,
  ]),
});
