export default {
  name: "linkInBioItem",
  title: "Link In Bio",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "url",
      title: "URL",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "active",
      title: "Active",
      type: "boolean",
    },
  ],
  preview: {
    select: {
      title: "title",
      media: "image",
    },
  },
};
