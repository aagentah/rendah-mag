import S from "@sanity/desk-tool/structure-builder";
import MdSettings from "react-icons/lib/md/settings";
import MDWeb from "react-icons/lib/md/web";

const hiddenDocTypes = listItem =>
  !["siteSettings", "homePage", "textBlock"].includes(listItem.getId());

export default () =>
  S.list()
    .title("Content")
    .items([
      //
      // S.listItem()
      //   .icon(MdSettings)
      //   .title("Site Settings")
      //   .child(
      //     S.editor()
      //       .schemaType("siteSettings")
      //       .documentId("siteSettings")
      //   ),
      //
      // S.listItem()
      //   .icon(MDWeb)
      //   .title("Home Page")
      //   .child(
      //     S.editor()
      //       .schemaType("homePage")
      //       .documentId("homePage")
      //   ),
      //
      S.divider(),
      //
      ...S.documentTypeListItems().filter(hiddenDocTypes)
    ]);
