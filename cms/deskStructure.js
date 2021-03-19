import S from "@sanity/desk-tool/structure-builder";
import MdSettings from "react-icons/lib/md/settings";
import MDWeb from "react-icons/lib/md/web";
import MDBook from "react-icons/lib/md/book";
import MDShop from "react-icons/lib/md/shop";
import MDPerson from "react-icons/lib/md/person";
import MDMusic from "react-icons/lib/md/music-note";
import MDMusicVideo from "react-icons/lib/md/music-video";
import MDLoyalty from "react-icons/lib/md/loyalty";
import MDViewList from "react-icons/lib/md/view-list";
import MDGridOn from "react-icons/lib/md/grid-on";

import SeoPreview from "./components/previews/userAddress";

const hiddenDocTypes = (listItem) =>
  !["siteSettings", "homePage", "textBlock"].includes(listItem.getId());

export default () =>
  S.list()
    // Top Level
    .title("Content")
    .items([
      S.listItem()
        .icon(MdSettings)
        .title("Site Settings")
        .child(
          S.editor().schemaType("siteSettings").documentId("siteSettings")
        ),
      S.listItem()
        .icon(MDViewList)
        .title("Link In Bio")
        .child(S.editor().schemaType("linkInBio").documentId("linkInBio")),
      // Divider
      S.divider(),
      // Blog
      S.listItem()
        .icon(MDBook)
        .title("Blog")
        .child(
          S.list()
            .title("Blog")
            .items([
              S.documentTypeListItem("post"),
              S.documentTypeListItem("author"),
              S.documentTypeListItem("category"),
            ])
        ),
      // Store
      S.listItem()
        .icon(MDShop)
        .title("Store")
        .child(
          S.list()
            .title("Store")
            .items([
              S.documentTypeListItem("storeItem"),
              S.documentTypeListItem("storeCollection"),
              S.documentTypeListItem("storeCategory"),
            ])
        ),
      // Dominion
      S.listItem()
        .icon(MDLoyalty)
        .title("Dominion")
        .child(
          S.list()
            .title("Dominion")
            .items([
              S.documentTypeListItem("user").icon(MDPerson),
              // S.listItem()
              //   .title("User")
              //   .schemaType("user")
              //   .child(
              //     S.documentTypeList("user")
              //       .title("Projects")
              //       .child((documentId) =>
              //         S.document()
              //           .documentId(documentId)
              //           .schemaType("user")
              //           .views([
              //             S.view
              //               .component(SeoPreview)
              //               .icon(MDViewList)
              //               .title("Address Label"),
              //           ])
              //       )
              //   ),
              S.documentTypeListItem("dominionItem"),
              S.documentTypeListItem("creations"),
              S.listItem()
                .icon(MDViewList)
                .title("Dominion Pipeline")
                .child(
                  S.editor()
                    .schemaType("dominionPipeline")
                    .documentId("dominionPipeline")
                ),
              S.divider(),
              S.listItem()
                .icon(MDViewList)
                .title("Dominion User Address Labels")
                .child(
                  S.editor()
                    .schemaType("user")
                    .title("User Address Labels")
                    .views([
                      S.view
                        .component(SeoPreview)

                        .icon(MDViewList)
                        .title("Address Labels"),
                    ])
                ),
            ])
        ),
      // Cypher
      S.documentTypeListItem("cypher").icon(MDMusic),
      // Guest Mix
      S.documentTypeListItem("mix").icon(MDMusicVideo),
      // Smart Link
      S.documentTypeListItem("smartLink").icon(MDViewList),
    ]);
