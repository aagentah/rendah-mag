import S from "@sanity/desk-tool/structure-builder";
import userStore from "part:@sanity/base/user";

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
import MDImage from "react-icons/lib/md/image";

import UsersAddress from "./components/previews/usersAddress";
import UsersOverview from "./components/previews/usersOverview";

const hiddenDocTypes = (listItem) =>
  !["siteSettings", "homePage", "textBlock"].includes(listItem.getId());

export default async () => {
  const { displayName } = await userStore.getUser("me");
  const isOwner = displayName === "Dan Jones";

  return (
    S.list()
      // Top Level
      .title("Content")
      .items([
        // Site Settings
        isOwner
          ? S.listItem()
              .icon(MdSettings)
              .title("Site Settings")
              .child(
                S.editor().schemaType("siteSettings").documentId("siteSettings")
              )
          : S.divider(),
        // Homepage
        isOwner
          ? S.listItem()
              .icon(MdSettings)
              .title("Home Page")
              .child(S.editor().schemaType("homePage").documentId("homePage"))
          : S.divider(),
        // Smart Link
        S.documentTypeListItem("smartLink").icon(MDViewList),
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
                isOwner ? S.documentTypeListItem("author") : S.divider(),
                isOwner ? S.documentTypeListItem("division") : S.divider(),
                isOwner ? S.documentTypeListItem("category") : S.divider(),
                S.documentTypeListItem("gallery"),
                isOwner
                  ? S.documentTypeListItem("newsletterGeneral")
                  : S.divider(),
                isOwner
                  ? S.documentTypeListItem("newsletterCypher")
                  : S.divider(),
              ])
          ),

        // Store
        isOwner
          ? S.listItem()
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
              )
          : S.divider(),
        // Dominion
        isOwner
          ? S.listItem()
              .icon(MDLoyalty)
              .title("Dominion")
              .child(
                S.list()
                  .title("Dominion")
                  .items([
                    S.documentTypeListItem("user").icon(MDPerson),
                    S.documentTypeListItem("dominionItem"),
                    S.documentTypeListItem("creations"),
                    S.documentTypeListItem("offering"),
                    S.documentTypeListItem("pack"),
                    S.documentTypeListItem("print"),
                    S.documentTypeListItem("track").icon(MDMusicVideo),
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
                      .title("Dominion Shipping")
                      .child(
                        S.editor()
                          .schemaType("user")
                          .title("Dominion Shipping")
                          .views([
                            S.view
                              .component(UsersAddress)
                              .icon(MDViewList)
                              .title("Dominion Shipping"),
                          ])
                      ),
                    S.listItem()
                      .icon(MDViewList)
                      .title("Dominion Overview")
                      .child(
                        S.editor()
                          .schemaType("user")
                          .title("Dominion Overview")
                          .views([
                            S.view
                              .component(UsersOverview)
                              .icon(MDViewList)
                              .title("Dominion Overview"),
                          ])
                      ),
                  ])
              )
          : S.divider(),
        // Cypher
        isOwner ? S.documentTypeListItem("cypher").icon(MDMusic) : S.divider(),
      ])
  );
};
