export default {
  name: "newsletterCypher",
  title: "Newsletter (Cypher)",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required().max(60),
    },
    {
      name: "from",
      title: "From (Author name)",
      type: "string",
      validation: (Rule) => Rule.required().max(60),
    },
    {
      name: "slug",
      title: "URL",
      type: "slug",
      description:
        "https://us17.campaign-archive.com/?u=df0d549f92845c8dfc4d99dde&id=386e804df3",
      options: {
        source: "activeFrom",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },

    {
      name: "activeFrom",
      title: "Active From",
      type: "date",
      validation: (Rule) => Rule.required(),
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
      media: "image",
    },
  },
};
