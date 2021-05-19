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
      name: "handle",
      title: "Handle",
      type: "string",
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
      type: "object",
      name: "address",
      title: "Address",
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        {
          name: "line1",
          title: "Line 1",
          type: "string",
        },
        {
          name: "line2",
          title: "Line 2",
          type: "string",
        },
        {
          name: "city",
          title: "City",
          type: "string",
        },
        {
          name: "postal_code",
          title: "Postcode",
          type: "string",
        },
        {
          name: "state",
          title: "State",
          type: "string",
        },
        {
          name: "country",
          title: "Country",
          type: "string",
        },
      ],
    },
    {
      name: "stripeCustomerId",
      title: "Stripe Customer ID",
      type: "string",
      required: true,
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
