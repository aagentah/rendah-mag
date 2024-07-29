import { defineConfig, useCurrentUser } from "sanity";

import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import schemas from "./schemas/schema";

import { PreviewLink } from "./actions/PreviewLink";
import UsersOverview from "./components/previews/UsersOverview";
import UsersAddress from "./components/previews/UsersAddress";
import StripeMetrics from "./components/previews/StripeMetrics";

import sanityClient from "@sanity/client";

// Create a Sanity client instance
const client = sanityClient({
  projectId: "q8z2vf2k",
  dataset: "production",
  useCdn: false, // `false` if you want to ensure fresh data
});

// Function to check if the user is an admin
const isAdmin = async () => {
  const currentUser = useCurrentUser();
  const adminUsers = ["Dan Jones"];
  return adminUsers.includes(currentUser.name);
};

const deskStructure = async (S) => {
  const admin = await isAdmin();

  return S.list()
    .title("Content")
    .items(
      [
        S.documentTypeListItem("post").title("Post"),
        S.documentTypeListItem("cypher").title("Cypher"),
        S.documentTypeListItem("gallery").title("Gallery Post"),
        admin && S.divider(),
        admin &&
          S.listItem()
            .title("Site Settings")
            .child(
              S.document().schemaType("siteSettings").documentId("siteSettings")
            ),
        admin && S.divider(),
        admin &&
          S.listItem()
            .title("Home Page")
            .child(S.document().schemaType("homePage").documentId("homePage")),
        admin && S.divider(),
        admin &&
          S.listItem()
            .title("Blog")
            .child(
              S.list()
                .title("Blog")
                .items([
                  S.documentTypeListItem("post").title("Post"),
                  S.documentTypeListItem("author").title("Author"),
                  S.documentTypeListItem("category").title("Category"),
                  S.documentTypeListItem("division").title("Division"),
                ])
            ),
        admin && S.divider(),
        admin &&
          S.listItem()
            .title("Store")
            .child(
              S.list()
                .title("Store")
                .items([
                  S.documentTypeListItem("storeItem").title("Store Item"),
                  S.documentTypeListItem("storeCollection").title(
                    "Store Collection"
                  ),
                  S.documentTypeListItem("storeCategory").title(
                    "Store Category"
                  ),
                ])
            ),
        admin && S.divider(),
        admin &&
          S.listItem()
            .title("Dominion")
            .child(
              S.list()
                .title("Dominion")
                .items([
                  S.documentTypeListItem("dominionItem").title("Dominion Item"),
                  S.listItem()
                    .title("UsersOverview")
                    .child(S.component(UsersOverview).title("UsersOverview")),
                  S.listItem()
                    .title("UsersAddress")
                    .child(S.component(UsersAddress).title("UsersAddress")),
                  S.listItem()
                    .title("StripeMetrics")
                    .child(S.component(StripeMetrics).title("StripeMetrics")),
                ])
            ),
        admin && S.divider(),
        admin &&
          S.listItem()
            .title("Newsletters")
            .child(
              S.list()
                .title("Newsletters")
                .items([
                  S.documentTypeListItem("newsletterGeneral").title(
                    "Newsletter General"
                  ),
                  S.documentTypeListItem("newsletterCypher").title(
                    "Newsletter Cypher"
                  ),
                ])
            ),
        admin && S.divider(),
        admin && S.documentTypeListItem("print").title("Prints"),
        admin && S.documentTypeListItem("user").title("User"),
      ].filter(Boolean)
    ); // Filter out false values
};

export default defineConfig({
  title: "rendah-mag-cms",
  projectId: "q8z2vf2k",
  dataset: "production",
  plugins: [structureTool({ structure: deskStructure }), visionTool()],
  schema: {
    types: schemas,
  },
  document: {
    actions: (prev, context) => {
      if (context.schemaType === "post" || context.schemaType === "creations") {
        return [...prev, PreviewLink];
      }
      return prev;
    },
  },
});
