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
      title: "name",
      media: "picture",
    },
  },
};
