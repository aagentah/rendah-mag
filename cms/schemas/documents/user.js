export default {
  name: "user",
  type: "document",
  title: "User",
  fields: [
    {
      name: "username",
      title: "Username",
      type: "string",
      required: true,
    },
    {
      name: "name",
      title: "Name",
      type: "string",
      required: true,
    },
    {
      name: "avatar",
      title: "Avatar",
      type: "image",
    },
    {
      name: "isDominion",
      title: "Dominion Member",
      type: "boolean",
    },
    {
      name: "dominionSince",
      title: "Dominion Since",
      type: "date",
    },
    {
      name: "publicProfile",
      title: "Public Profile",
      type: "boolean",
    },
    {
      title: "Tags",
      name: "tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    },
    {
      name: "salt",
      title: "Salt",
      type: "string",
      required: true,
    },
    {
      name: "hash",
      title: "Hash",
      type: "string",
      required: true,
    },
  ],
  orderings: [
    {
      title: "Name",
      name: "author",
      by: [{ field: "author", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      name: "name",
      dominionSince: "dominionSince",
      isDominionWiteList: "isDominionWiteList",
      avatar: "avatar",
    },
    prepare(selection) {
      console.log("selection", selection);
      const { name, dominionSince, isDominionWiteList, avatar } = selection;
      return {
        title: name,
        subtitle: `
          ${dominionSince ? `Dominion. ` : ""}
          ${isDominionWiteList ? `White Listed. ` : ""}
        `,
        media: avatar,
      };
    },
  },
};
