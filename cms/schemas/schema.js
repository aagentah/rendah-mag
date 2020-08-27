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
import guestMix from "./documents/guestMix";

// User
import user from "./documents/user";

// Dominion
import subscriptionItem from "./documents/subscriptionItem";

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
    guestMix,
    user,
    subscriptionItem,
    //
    siteSettings,
  ]),
});
