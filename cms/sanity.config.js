// sanity.config.js
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure"; // Updated import
import { visionTool } from "@sanity/vision";
import schemas from "./schemas/schema";

const deskStructure = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Site Settings")
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings")
        ),
      S.divider(),
      S.listItem()
        .title("Home Page")
        .child(S.document().schemaType("homePage").documentId("homePage")),
      S.divider(),
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
      S.divider(),
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
              S.documentTypeListItem("storeCategory").title("Store Category"),
            ])
        ),
      S.divider(),
      S.listItem()
        .title("Dominion")
        .child(
          S.list()
            .title("Dominion")
            .items([
              S.documentTypeListItem("dominionItem").title("Dominion Item"),

              // S.documentTypeListItem("dominionPipeline").title(
              //   "Dominion Pipeline"
              // ),
              // S.documentTypeListItem("dominionShipping").title(
              //   "Dominion Shipping"
              // ),
              // S.documentTypeListItem("dominionOverview").title(
              //   "Dominion Overview"
              // ),
            ])
        ),
      S.divider(),
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
      S.divider(),
      S.documentTypeListItem("gallery").title("Gallery Post"),
      // S.documentTypeListItem("creations").title("Creations"),
      // S.documentTypeListItem("offering").title("Offering"),
      S.documentTypeListItem("print").title("Prints"),
      // S.documentTypeListItem("track").title("Track"),
      // S.documentTypeListItem("pack").title("Pack"),
      S.documentTypeListItem("cypher").title("Cypher"),
      // S.documentTypeListItem("stripeMetrics").title("Stripe Metrics"),
      S.documentTypeListItem("user").title("User"),
    ]);

export default defineConfig({
  title: "rendah-mag-cms",
  projectId: "q8z2vf2k",
  dataset: "production",
  plugins: [structureTool({ structure: deskStructure }), visionTool()], // Updated plugin usage
  schema: {
    types: schemas,
  },
});
