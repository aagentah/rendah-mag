import S from "@sanity/desk-tool/structure-builder";
import MdSettings from "react-icons/lib/md/settings";
import MDWeb from "react-icons/lib/md/web";
import MDBook from "react-icons/lib/md/book";
import MDShop from "react-icons/lib/md/shop";
import MDPerson from "react-icons/lib/md/person";
import MDMusic from "react-icons/lib/md/music-note";
import MDMusicVideo from "react-icons/lib/md/music-video";

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
      // Cypher
      S.documentTypeListItem("cypher").icon(MDMusic),
      // Guest Mix
      S.documentTypeListItem("guestMix").icon(MDMusicVideo),
      // User
      S.documentTypeListItem("user").icon(MDPerson),
    ]);
