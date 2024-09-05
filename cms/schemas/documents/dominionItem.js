export default {
  name: "dominionItem",
  title: "Newsletter (Dominion)",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required().max(60),
    },
    {
      name: "subtitle",
      title: "Sub Title",
      type: "string",
    },
    {
      name: "from",
      title: "From (Author name)",
      type: "string",
      validation: (Rule) => Rule.required().max(60),
    },
    {
      name: "activeFrom",
      title: "Active From",
      type: "date",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "URL",
      type: "slug",
      description:
        "https://us17.campaign-archive.com/?u=df0d549f92845c8dfc4d99dde&id=1c39a80d54",
      options: {
        source: "activeFrom",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "coverImage",
      title: "Image",
      type: "image",
    },
    {
      name: "description",
      title: "Description",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
        },
      ],
    },
  ],
  preview: {
    select: {
      title: "title",
      media: "coverImage",
    },
  },
};
