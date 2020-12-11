export default {
  name: "linkInBio",
  title: "Link In Bio",
  type: "document",
  fields: [
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
